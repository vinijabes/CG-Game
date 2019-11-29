const Ava = require('Ava/src/Ava');
const Camera = require('./Components/AnimatedCamera');
const Ball = require('./Components/Ball');
const LineObject = require('./Components/LineObject');

document.getElementById('view').width = document.documentElement.clientWidth;
document.getElementById('view').height = document.documentElement.clientHeight;

const context = new Ava.Canvas.CanvasContext(document.getElementById('view').getContext('2d'));

Ava.Canvas.CanvasApi.s_Context = context;

let camera = new Camera();
camera.SetProjection(Ava.Math.Mat4.OrthoFrustum(-1.0, 1.0, -1.0, 1.0, 0.1, 1000));
camera.SetView(Ava.Math.Mat4.Viewport(-context.Width / 2, context.Width / 2, -context.Height / 2, context.Height / 2, -1, 1));
Ava.Canvas.CanvasApi.SetLocation(context, 0, camera);

//camera.GoTo(new Ava.Math.Vec3(0, 0, 0), 2);
//camera.RotateTo(90, 0, 0, 0.5);

let window = new Ava.Renderer.Window(new Ava.Math.Vec2(-context.Width / 2, -context.Height / 2), new Ava.Math.Vec2(context.Width, context.Height))
Ava.Canvas.CanvasApi.SetLocation(context, 2, window);

let multipleLightPointsShader = new Ava.Renderer.Shader();
multipleLightPointsShader.UploadData("lightPos", new Ava.Math.Vec3(0, 0, 50));
multipleLightPointsShader.Compile("let N = location.normal; let L = this.Vec3.Sub(location.lightPos, ava.position).Normalize(); let R = (N.Clone().Mult(2 * N.Dot(L))).Sub(L).Normalize(); let S = this.Vec3.Sub(location.observatorPos, ava.position).Normalize(); let cosTeta = ((N.Dot(L)) / (N.Norm() * L.Norm())); let cosAlpha = (R.Dot(S)) / (R.Norm() * S.Norm()); if(cosTeta < 0 || cosAlpha < 0) cosAlpha = 0; let d = this.Vec3.Sub(location.lightPos, ava.position).Norm() / (Math.sqrt(ava.width**2 + ava.height**2)/8); let k = 0.3; ava.color = new this.Vec4(this.Vec3.Mult(ava.color, 0.2 + 1.0 * (location.Kd * cosTeta + location.Ks * Math.pow(cosAlpha, location.n)) / (k + d)), 1.0);");

let sphere = new Ball();
sphere.Transform.Translate(new Ava.Math.Vec3(0, 0, 2.5));
sphere.m_Material.m_Shader = multipleLightPointsShader;
sphere.m_Material.m_Ks = 0.8;
sphere.m_Material.m_Kd = 0.5;
sphere.m_Material.m_N = 30;
sphere.AddComponent(Ava.Engine.Components.SphereRenderer);
sphere.GetComponent(Ava.Engine.Components.SphereRenderer).Radius = 5;
sphere.GetComponent(Ava.Engine.Components.SphereRenderer).Color = new Ava.Math.Vec4(213 / 255, 112 / 255, 67 / 255, 1);
sphere.Transform.Translate(new Ava.Math.Vec3(0, 0, 100));
sphere.SetCamera(camera);

let tabela = new Ava.Engine.GameObject("Tabela");
tabela.AddComponent(Ava.Engine.Components.MeshRenderer);
tabela.GetComponent(Ava.Engine.Components.MeshRenderer).m_Mesh.Vertex = [
    -150, -100, 0, 1, 1, 1, 1, 0, 1, 0,
    -150, 100, 0, 1, 1, 1, 1, 0, 1, 0,
    150, -100, 0, 1, 1, 1, 1, 0, 1, 0,
    150, 100, 0, 1, 1, 1, 1, 0, 1, 0,
    -50, -50, 2, 0, 0, 0, 0, 0, 1, 0,
    -50, 20, 2, 0, 0, 0, 0, 0, 1, 0,
    50, -50, 2, 0, 0, 0, 0, 0, 1, 0,
    50, 20, 2, 0, 0, 0, 0, 0, 1, 0,
    -45, -45, 4, 1, 1, 1, 1, 0, 1, 0,
    -45, 15, 4, 1, 1, 1, 1, 0, 1, 0,
    45, -45, 4, 1, 1, 1, 1, 0, 1, 0,
    45, 15, 4, 1, 1, 1, 1, 0, 1, 0,
];

tabela.GetComponent(Ava.Engine.Components.MeshRenderer).m_Mesh.Index = [
    0, 1, 2,
    3, 2, 1,
    4, 5, 6,
    7, 6, 5,
    8, 9, 10,
    11, 10, 9
]

let aro = new LineObject("Aro");
for (let radius = 50; radius > 45; radius--) {
    for (let h = 0; h < 5; h++) {
        for (let i = 0; i <= 2 * Math.PI; i += Math.PI / 8) {
            let x = radius * Math.cos(i);
            let y = radius * Math.sin(i);

            aro.AddPoint(new Ava.Math.Vec3(x, y, h));
        }
        aro.AddPoint(new Ava.Math.Vec3(radius * Math.cos(0), radius * Math.sin(0), h));
    }
}

let net = new LineObject("Net");
let netCircle1 = new LineObject("NetCircle");
let netVertical1 = new LineObject("NetVertical");
let netVertical2 = new LineObject("NetVertical");
let netVertical3 = new LineObject("NetVertical");
let netVertical4 = new LineObject("NetVertical");

tabela.m_Material.m_Shader = multipleLightPointsShader;
tabela.m_Material.m_Kd = 0.6;
tabela.m_Material.m_Ks = 0.4;
tabela.m_Material.m_N = 50;

netCircle1.m_Color = new Ava.Math.Vec4(0.2, 0.3, 0.2, 1);

for (let radius = 45; radius > 40; radius--) {
    for (let h = 0; h < 5; h++) {
        for (let i = 0; i <= 2 * Math.PI; i += Math.PI / 8) {
            let x = radius * Math.cos(i);
            let y = radius * Math.sin(i);

            netCircle1.AddPoint(new Ava.Math.Vec3(x, y, h));
        }
        netCircle1.AddPoint(new Ava.Math.Vec3(radius * Math.cos(0), radius * Math.sin(0), h));
    }
}

for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 5; i++) {
        netVertical1.AddPoint(new Ava.Math.Vec3((45 + j) * Math.cos(i * 0.01), (45 + j) * Math.sin(i * 0.01), 0));
        netVertical1.AddPoint(new Ava.Math.Vec3((40 + j) * Math.cos(i * 0.01), (40 + j) * Math.sin(i * 0.01), 30));
        netVertical1.AddPoint(new Ava.Math.Vec3((40 + j) * Math.cos((i + 1) * 0.01), (40 + j) * Math.sin((i + 1) * 0.01), 30));
        netVertical1.AddPoint(new Ava.Math.Vec3((45 + j) * Math.cos((i + 1) * 0.01), (45 + j) * Math.sin((i + 1) * 0.01), 0));

        netVertical2.AddPoint(new Ava.Math.Vec3((45 + j) * Math.cos(i * 0.01 + Math.PI / 2), (45 + j) * Math.sin(i * 0.01 + Math.PI / 2), 0));
        netVertical2.AddPoint(new Ava.Math.Vec3((40 + j) * Math.cos(i * 0.01 + Math.PI / 2), (40 + j) * Math.sin(i * 0.01 + Math.PI / 2), 30));
        netVertical2.AddPoint(new Ava.Math.Vec3((40 + j) * Math.cos((i + 1) * 0.01 + Math.PI / 2), (40 + j) * Math.sin((i + 1) * 0.01 + Math.PI / 2), 30));
        netVertical2.AddPoint(new Ava.Math.Vec3((45 + j) * Math.cos((i + 1) * 0.01 + Math.PI / 2), (45 + j) * Math.sin((i + 1) * 0.01 + Math.PI / 2), 0));

        netVertical3.AddPoint(new Ava.Math.Vec3((45 + j) * Math.cos(i * 0.01 + 2 * Math.PI / 2), (45 + j) * Math.sin(i * 0.01 + 2 * Math.PI / 2), 0));
        netVertical3.AddPoint(new Ava.Math.Vec3((40 + j) * Math.cos(i * 0.01 + 2 * Math.PI / 2), (40 + j) * Math.sin(i * 0.01 + 2 * Math.PI / 2), 30));
        netVertical3.AddPoint(new Ava.Math.Vec3((40 + j) * Math.cos((i + 1) * 0.01 + 2 * Math.PI / 2), (40 + j) * Math.sin((i + 1) * 0.01 + 2 * Math.PI / 2), 30));
        netVertical3.AddPoint(new Ava.Math.Vec3((45 + j) * Math.cos((i + 1) * 0.01 + 2 * Math.PI / 2), (45 + j) * Math.sin((i + 1) * 0.01 + 2 * Math.PI / 2), 0));

        netVertical4.AddPoint(new Ava.Math.Vec3((45 + j) * Math.cos(i * 0.01 + 3 * Math.PI / 2), (45 + j) * Math.sin(i * 0.01 + 3 * Math.PI / 2), 0));
        netVertical4.AddPoint(new Ava.Math.Vec3((40 + j) * Math.cos(i * 0.01 + 3 * Math.PI / 2), (40 + j) * Math.sin(i * 0.01 + 3 * Math.PI / 2), 30));
        netVertical4.AddPoint(new Ava.Math.Vec3((40 + j) * Math.cos((i + 1) * 0.01 + 3 * Math.PI / 2), (40 + j) * Math.sin((i + 1) * 0.01 + 3 * Math.PI / 2), 30));
        netVertical4.AddPoint(new Ava.Math.Vec3((45 + j) * Math.cos((i + 1) * 0.01 + 3 * Math.PI / 2), (45 + j) * Math.sin((i + 1) * 0.01 + 3 * Math.PI / 2), 0));
    }
}

netVertical1.m_Color = new Ava.Math.Vec4(0, 0, 0, 1);
netVertical2.m_Color = new Ava.Math.Vec4(0, 0, 0, 1);
netVertical3.m_Color = new Ava.Math.Vec4(0, 0, 0, 1);
netVertical4.m_Color = new Ava.Math.Vec4(0, 0, 0, 1);

net.AddChild(netCircle1);
net.AddChild(netVertical1);
net.AddChild(netVertical2);
net.AddChild(netVertical3);
net.AddChild(netVertical4);
netCircle1.Transform.Translate(new Ava.Math.Vec3(0, -30, 0));

aro.m_Color = new Ava.Math.Vec4(0, 0, 0, 1);
aro.Transform.Rotate(0, 0, 90);
aro.Transform.Translate(new Ava.Math.Vec3(0, -45, 52));
aro.AddChild(net);

let cesta = new Ava.Engine.GameObject();
cesta.AddChild(tabela);
cesta.AddChild(aro);
cesta.m_Center = new Ava.Math.Vec3(0, -50, 0);

cesta.Transform.Scale(0.5, 0.5, 1, 1);

let last = 0;
let sum = 0;
let fps = 0;

let fps30 = 1 / 30;

const render = (now) => {
    let delta = (now - last) / 1000;
    last = now;

    sum += delta;
    fps++;
    if (sum > 1) {
        sum = 0;
        console.log(fps);
        fps = 0;
    }

    //sphere.Update(fps30);
    //tabela.Update(fps30);
    cesta.Update(fps30);
    //table.Update(fps30);
    //room.Update(fps30);
    camera.Update(fps30);

    Ava.Engine.RendererSystem.Flush();
    Ava.Canvas.CanvasApi.SwapBuffer(context);

    requestAnimationFrame(render);
}

requestAnimationFrame(render);

console.log(document.getElementById('view').width);
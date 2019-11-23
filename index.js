const Ava = require('Ava/src/Ava');
const Camera = require('./Components/AnimatedCamera');
const Ball = require('./Components/Ball');

document.getElementById('view').width = document.documentElement.clientWidth;
document.getElementById('view').height = document.documentElement.clientHeight;

const context = new Ava.Canvas.CanvasContext(document.getElementById('view').getContext('2d'));

Ava.Canvas.CanvasApi.s_Context = context;

let camera = new Camera();
camera.SetProjection(Ava.Math.Mat4.Cabinet());
camera.SetView(Ava.Math.Mat4.Viewport(-context.Width / 2, context.Width / 2, -context.Height / 2, context.Height / 2, -1, 1));
Ava.Canvas.CanvasApi.SetLocation(context, 0, camera);

camera.GoTo(new Ava.Math.Vec3(100, 100, 0), 2);
camera.RotateTo(45, 45, 45, 0.5);

let window = new Ava.Renderer.Window(new Ava.Math.Vec2(-context.Width / 2, -context.Height / 2), new Ava.Math.Vec2(context.Width, context.Height))
Ava.Canvas.CanvasApi.SetLocation(context, 2, window);

let multipleLightPointsShader = new Ava.Renderer.Shader();
multipleLightPointsShader.Compile("let N = location.normal; let L = this.Vec3.Sub(location.lightPos, ava.position).Normalize(); let R = (N.Clone().Mult(2 * N.Dot(L))).Sub(L).Normalize(); let S = this.Vec3.Sub(location.observatorPos, ava.position).Normalize(); let cosTeta = ((N.Dot(L)) / (N.Norm() * L.Norm())); let cosAlpha = (R.Dot(S)) / (R.Norm() * S.Norm()); if(cosTeta < 0 || cosAlpha < 0) cosAlpha = 0; let d = this.Vec3.Sub(location.lightPos, ava.position).Norm() / (Math.sqrt(ava.width**2 + ava.height**2)/8); let k = 0.3; ava.color = new this.Vec4(this.Vec3.Mult(ava.color, 0.2 + 1.4 * (location.Kd * cosTeta + location.Ks * Math.pow(cosAlpha, location.n)) / (k + d)), 1.0);");

let sphere = new Ball();
sphere.Transform.Translate(new Ava.Math.Vec3(0, 0, 2.5));
sphere.m_Material.m_Shader = multipleLightPointsShader;
sphere.m_Material.m_Ks = 0.1;
sphere.m_Material.m_Kd = 0.4;
sphere.m_Material.m_N = 10;
sphere.AddComponent(Ava.Engine.Components.SphereRenderer);
sphere.GetComponent(Ava.Engine.Components.SphereRenderer).Radius = 5;
sphere.GetComponent(Ava.Engine.Components.SphereRenderer).Color = new Ava.Math.Vec4(1, 1, 1, 1);
sphere.Transform.Translate(new Ava.Math.Vec3(0, 0, 100));

let table = new Ava.Engine.GameObject();
table.m_Material.m_Shader = multipleLightPointsShader;
table.m_Material.m_Ks = 0.4;
table.m_Material.m_Kd = 0.7;
table.m_Material.m_N = 10;
table.AddComponent(Ava.Engine.Components.MeshRenderer);
table.GetComponent(Ava.Engine.Components.MeshRenderer).m_Mesh.Vertex = [
    -150, -200, 0, 0, 0, 1, 1,//0
    -150, 200, 0, 0, 0, 1, 1,//1
    150, 200, 0, 0, 0, 1, 1,//2
    150, -200, 0, 0, 0, 1, 1,//3
    -150, -200, 2, 1, 1, 1, 1,//4
    -150, 200, 2, 1, 1, 1, 1,//5
    -140, 200, 2, 1, 1, 1, 1,//6
    -140, -200, 2, 1, 1, 1, 1,//7
    150, -200, 2, 1, 1, 1, 1,
    150, 200, 2, 1, 1, 1, 1,
    140, 200, 2, 1, 1, 1, 1,
    140, -200, 2, 1, 1, 1, 1,
    -150, -190, 2, 1, 1, 1, 1,
    150, -190, 2, 1, 1, 1, 1,
    -150, 190, 2, 1, 1, 1, 1,
    150, 190, 2, 1, 1, 1, 1,//15
    -150, -200, -15, 0, 0, 1, 1,//16
    -150, 200, -15, 0, 0, 1, 1,//17
    150, 200, -15, 0, 0, 1, 1,//18
    150, -200, -15, 0, 0, 1, 1,//19
];

table.GetComponent(Ava.Engine.Components.MeshRenderer).m_Mesh.Index = [    
    0, 1, 3, 
    2, 1, 3,
    4, 5, 6,
    4, 6, 7,
    8, 9, 10,
    8, 10, 11,
    4, 12, 13,
    4, 8, 13,
    5, 14, 15,
    5, 9, 15,
    16, 17, 19,
    18, 17, 19,
    0, 16, 19,
    0, 3, 19,
    0, 16, 17,
    0, 1, 17,
    2, 18, 17,
    2, 1, 17,
    2, 18, 19,
    2, 3, 19
]


let room = new Ava.Engine.GameObject();
room.m_Material.m_Shader = multipleLightPointsShader;
room.m_Material.m_Ks = 0.4;
room.m_Material.m_Kd = 0.7;
room.m_Material.m_N = 10;
room.AddComponent(Ava.Engine.Components.MeshRenderer);
room.GetComponent(Ava.Engine.Components.MeshRenderer).m_Mesh.Vertex = [
    -300, -300, -100, 0.15, 0.10, 0.05, 1,//0
    300, -300, -100, 0.15, 0.10, 0.05, 1,//1
    300, 300, -100, 0.15, 0.10, 0.05, 1,//2
    -300, 300, -100, 0.15, 0.10, 0.05, 1,//3
    -300, -300, 200, 0.15, 0.10, 0.05, 1,//4
    300, -300, 200, 0.15, 0.10, 0.05, 1,//5
    300, 300, 200, 0.15, 0.10, 0.05, 1,//6
    -300, 300, 200, 0.15, 0.10, 0.05, 1,//7
];

room.GetComponent(Ava.Engine.Components.MeshRenderer).m_Mesh.Index = [
    0, 1, 3,
    2, 1, 3,
    0, 4, 1,
    4, 1, 5,
    0, 4, 3,
    4, 3, 7,
    2, 6, 3,
    6, 3, 7,
    2, 6, 1,
    6, 1, 5, 
];



let last = 0;
let sum = 0;
let fps = 0;

let fps30 = 1/30;

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

    sphere.Update(fps30);
    table.Update(fps30);
    //room.Update(fps30);
    camera.Update(fps30);

    Ava.Engine.RendererSystem.Flush();
    Ava.Canvas.CanvasApi.SwapBuffer(context);
    
    requestAnimationFrame(render);
}

requestAnimationFrame(render);

console.log(document.getElementById('view').width);
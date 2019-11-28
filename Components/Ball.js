const GameObject = require("Ava/src/Ava").Engine.GameObject;
const Vec3 = require("Ava/src/Ava").Math.Vec3;
const SphereRenderer = require("Ava/src/Ava").Engine.Components.SphereRenderer;

class Ball extends GameObject {

    falling = true;
    originHeight;
    maxHeight;

    Update(delta) {
        super.Update(delta);
        if (!this.originHeight) this.originHeight = this.Transform.m_Position.z;

        if (this.falling && this.Transform.m_Position.z > 2.5) this.Transform.Translate(new Vec3(0, 0, -30 * delta));
        else if (this.Transform.m_Position.z <= 2.5) {
            this.maxHeight = this.originHeight / 2
            this.falling = false;
        }

        if (!this.falling && this.Transform.m_Position.z < this.maxHeight) this.Transform.Translate(new Vec3(0, 0, 30 * delta));
        else if (this.Transform.m_Position.z >= this.maxHeight) {
            this.originHeight = this.Transform.m_Position.z;
            this.falling = true;
        }

        if (this.m_Camera) {
            let dist = Vec3.Sub(
                this.m_Camera.m_Transform.m_Position,
                this.Transform.m_Position
            ).Norm();
            this.GetComponent(SphereRenderer).Radius = Math.min(Math.max(100/dist, 3), 50);
        }
    }

    SetCamera(camera) {
        this.m_Camera = camera;
    }
}

module.exports = Ball;
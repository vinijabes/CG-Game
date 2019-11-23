const {Camera} = require('Ava/src/Ava').Renderer;
const {Vec3} = require('Ava/src/Ava').Math;

class AnimatedCamera extends Camera{
    GoTo(pos, time){
        this.destPos = pos;
        this.destVelocity = new Vec3((pos.x - this.m_Position.x)/time, (pos.y - this.m_Position.y)/time, (pos.z - this.m_Position.z)/time);
        this.destTime = time;
    }

    RotateTo(x, y, z, time){
        this.destX = x;
        this.destY = y;
        this.destZ = z;
        let current = this.m_Transform.m_LocalEulerAngles;
        this.destRotationVelocity = new Vec3((x - current.x)/time, (y - current.y)/time, (z - current.z)/time);
        this.destRotationTime = time;
    }

    Update(delta){
        super.Update(delta);

        if(this.destTime > 0){
            this.m_Transform.Translate(Vec3.Mult(this.destVelocity, delta));
            this.destTime -= delta;
        }

        if(this.destRotationTime > 0){
            this.m_Transform.Rotate(this.destRotationVelocity.x * delta, this.destRotationVelocity.y * delta, this.destRotationVelocity.z * delta)
            this.destRotationTime -= delta;
        }
    }
}

module.exports = AnimatedCamera;
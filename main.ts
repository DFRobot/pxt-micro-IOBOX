/*！
 * @file pxt-micro-IOBOX/main.ts
 * @brief DFRobot's microbit motor drive makecode library.
 * @n [Get the module here](http://www.dfrobot.com.cn/goods-1577.html)
 * @n This is the microbit special motor drive library, which realizes control 
 *    of the eight-channel steering gear, two-step motor and four-way dc motor.
 *
 * @copyright	[DFRobot](http://www.dfrobot.com), 2016
 * @copyright	MIT Lesser General Public License
 *
 * @author [email](1035868977@qq.com)
 * @version  V1.0
 * @date  2018-03-20
 */


//% weight=10 color=#DF6721 icon="\uf013" block="DF-Driver"
namespace microIOBOX {
    const PCA9685_ADDRESS = 0x40

    /**
     * The user selects the 4-way dc motor.
     */
    export enum Motors {
        M1 = 0x00,
        M2 = 0x01
    }

    /**
     * The user defines the motor rotation direction.
     */
    export enum Dir {
        //% blockId="CW" block="CW"
        CW = 0x00,
        //% blockId="CCW" block="CCW"
        CCW = 0x01
    }

    /**
	 * Execute a motor
     * M1~M4.
     * speed(0~255).
    */
    //% weight=90
    //% blockId=motor_MotorRun block="Motor|%index|dir|%Dir|speed|%speed"
    //% speed.min=0 speed.max=255
    //% index.fieldEditor="gridpicker" index.fieldOptions.columns=2
    //% direction.fieldEditor="gridpicker" direction.fieldOptions.columns=2
    export function motorRun(index: Motors, direction:Dir, speed: number): void {
        let buf = pins.createBuffer(3);
        if (index==0){
            buf[0]=0x00;
        }
        if (index==1){
            buf[0]=0x02;
        }
        buf[1]=direction;
        buf[2]=speed;
        pins.i2cWriteBuffer(0x10, buf);
    }

    /**
	 * Stop the dc motor.
    */
    //% weight=20
    //% blockId=motor_motorStop block="Motor stop|%index"
    //% index.fieldEditor="gridpicker" index.fieldOptions.columns=2 
    export function motorStop(index: Motors) {
        let buf = pins.createBuffer(3);
        if(index==0){
            buf[0]=0x00;
        }
        if(index==1){
            buf[0]=0x02;
        }
        buf[1]=0;
        buf[2]=0;
        pins.i2cWriteBuffer(0x10, buf);
    }

    /**
	 * Stop all motors
    */
    //% weight=10
    //% blockId=motor_motorStopAll block="Motor Stop All"
    export function motorStopAll(): void {
        let buf = pins.createBuffer(3);
        buf[0]=0x00;
        buf[1]=0;
        buf[2]=0;
        pins.i2cWriteBuffer(0x10, buf);
        buf[0]=0x02;
        pins.i2cWriteBuffer(0x10, buf);
    }
}


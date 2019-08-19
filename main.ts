/*！
 * @file pxt-micro-IOBOX/main.ts
 * @brief DFRobot's microbit motor drive makecode library.
 * @n [Get the module here](http://www.dfrobot.com.cn/index.php)
 * @n This is the microbit special motor drive library, which realizes control 
 *    of the eight-channel steering gear, two-step motor and four-way dc motor.
 *
 * @copyright	[DFRobot](http://www.dfrobot.com), 2016
 * @copyright	MIT Lesser General Public License
 *
 * @author [email](xin.li@dfrobot.com)
 * @version  V0.1
 * @date  2018-11-16
 */


//% weight=10 color=#DF6721 icon="\uf013" block="micro:IOBOX"
namespace microIOBOX {
    const address = 0x10

    /**
     * The user selects the 4-way dc motor.
     */
    export enum Motors {
        M1 = 0x00,
        M2 = 0x01,
        M3 = 0x02,
        M4 = 0x03
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
     * M1~M2.
     * speed(0~255).
    */
    //% weight=90
    //% blockId=motor_motorRun block="Motor|%index|dir|%Dir|speed|%speed"
    //% speed.min=0 speed.max=255
    //% index.fieldEditor="gridpicker" index.fieldOptions.columns=1
    //% direction.fieldEditor="gridpicker" direction.fieldOptions.columns=1
    export function motorRun(index: Motors, direction: Dir, speed: number): void {
        let buf = pins.createBuffer(3);
        if (index == 0) {
            buf[0] = 0x00;
        }
        if (index == 1) {
            buf[0] = 0x02;
        }
        if (index == 2) {
            buf[0] = 0x04;
        }
        if (index == 3) {
            buf[0] = 0x06;
        }
        buf[1] = direction;
        buf[2] = speed;
        pins.i2cWriteBuffer(address, buf);
    }

    /**
	 * Stop the dc motor.
    */
    //% weight=20
    //% blockId=motor_motorStop block="Motor stop|%index"
    //% index.fieldEditor="gridpicker" index.fieldOptions.columns=1
    export function motorStop(index: Motors) {
        let buf = pins.createBuffer(3);
        if (index == 0) {
            buf[0] = 0x00;
        }
        if (index == 1) {
            buf[0] = 0x02;
        }
        if (index == 2) {
            buf[0] = 0x04;
        }
        if (index == 3) {
            buf[0] = 0x06;
        }
        buf[1] = 0;
        buf[2] = 0;
        pins.i2cWriteBuffer(address, buf);
    }

    /**
	 * Stop all motors
    */
    //% weight=10
    //% blockId=motor_motorStopAll block="Motor Stop All"
    export function motorStopAll(): void {
        let buf = pins.createBuffer(3);
        buf[0] = 0x00;
        buf[1] = 0;
        buf[2] = 0;
        pins.i2cWriteBuffer(address, buf);
        buf[0] = 0x02;
        pins.i2cWriteBuffer(address, buf);
        buf[0] = 0x04;
        pins.i2cWriteBuffer(address, buf);
        buf[0] = 0x06;
        pins.i2cWriteBuffer(address, buf);
    }
}


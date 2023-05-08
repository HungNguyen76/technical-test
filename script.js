function findMin() {
    const inputString = document.getElementById('input').value;
    const arr = inputString.split('\n').map((str) => str.split(' '));

    let outputValue;
    let arrOutput = [];
    for (let i = 0; i < arr.length; i++) {
        let index = 0;
        const splitString = arr[i];
        const n = parseInt(splitString[index++]);
        const orderQueue = [];
        const robotAQueue = [];
        const robotBQueue = [];

        for (let j = 0; j < n; j++) {
            const robot = splitString[index++];
            orderQueue.push(robot);

            if (robot === 'A') {
                robotAQueue.push(parseInt(splitString[index++]));
            } else {
                robotBQueue.push(parseInt(splitString[index++]));
            }
        }

        let res = 0;
        let aPos = 1;
        let bPos = 1;

        while (true) {
            if (orderQueue.length === 0) {
                break;
            }
            const robot = orderQueue.shift();

            if (robot === 'A') {
                const robotASwitch = robotAQueue.shift();
                const aTimeRequired = Math.abs(robotASwitch - aPos) + 1;
                res += aTimeRequired;
                aPos = robotASwitch;

                if (robotBQueue.length !== 0) {
                    const robotBSwitch = robotBQueue.shift();
                    robotBQueue.unshift(robotBSwitch);
                    const bTimeRequired = Math.abs(robotBSwitch - bPos);
                    if (bTimeRequired >= aTimeRequired) {
                        bPos =
                            robotBSwitch > bPos
                                ? bPos + aTimeRequired
                                : bPos - aTimeRequired;
                    } else {
                        bPos = robotBSwitch;
                    }
                }
            } else {
                const robotBSwitch = robotBQueue.shift();
                const bTimeRequired = Math.abs(robotBSwitch - bPos) + 1;
                res += bTimeRequired;
                bPos = robotBSwitch;

                if (robotAQueue.length !== 0) {
                    const robotASwitch = robotAQueue.shift();
                    robotAQueue.unshift(robotASwitch);
                    const aTimeRequired = Math.abs(robotASwitch - aPos);
                    if (aTimeRequired >= bTimeRequired) {
                        aPos =
                            robotASwitch > aPos
                                ? aPos + bTimeRequired
                                : aPos - bTimeRequired;
                    } else {
                        aPos = robotASwitch;
                    }
                }
            }
        }
        res === 0 ? '' : outputValue = `Case #${i + 1}: ${res}`;
        arrOutput.push(outputValue);
    }
    document.getElementById('output').innerHTML = arrOutput.join('<br />');
}
findMin();

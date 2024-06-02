// async function checkHeldKeys() {
//     let heldKeys = await eel.getHeldKeys()();
//     console.log(heldKeys);
// }

async function handleInputs() {
    let heldKeys = await eel.getHeldKeys()();
    let shiftLock = await eel.isShiftLocked()();

    let keys = ['W', 'A', 'S', 'D', 'SPACE'];
    let anyPressed = false;
    let showAB = false;

    const keystrokes = document.getElementById('keystrokes');
    const crosshair = document.getElementById('crosshair');
    const spinner = document.getElementById('spinner');

    const actionbar = document.getElementById('actionbar');
    const ads = document.getElementById('ab-ads');
    const sprint = document.getElementById('ab-sprint');
    const crouch = document.getElementById('ab-crouch');
    const shiftLockElm = document.getElementById('ab-shiftLock');

    keys.forEach(key => {
        let keyElement = document.getElementById(key);

        if (heldKeys.includes(key)) keyElement.classList.add('pressed');
        else keyElement.classList.remove('pressed');
    });

    keys.forEach(key => {
        if (heldKeys.includes(key)) anyPressed = true;
    })

    if (heldKeys.includes('MOUSE.RIGHT') && !heldKeys.includes('SHIFT')) {
        if (shiftLock) spinner.classList.add('ads');
        else spinner.classList.remove('ads');

        crosshair.classList.add('ads');
        ads.classList.add('pressed');
    } else {
        crosshair.classList.remove('ads');
        spinner.classList.remove('ads');
        ads.classList.remove('pressed');
    }

    if (heldKeys.includes('SHIFT') && !heldKeys.includes('C') && anyPressed) {
        sprint.classList.add('pressed');
    } else {
        sprint.classList.remove('pressed');
    }

    if (heldKeys.includes('SHIFT') ||
        heldKeys.includes('C') ||
        heldKeys.includes('MOUSE.RIGHT') ||
        shiftLock) actionbar.classList.add('shown');
    else actionbar.classList.remove('shown');

    if (heldKeys.includes('C')) crouch.classList.add('pressed');
    else crouch.classList.remove('pressed');

    if (shiftLock) shiftLockElm.classList.add('pressed');
    else shiftLockElm.classList.remove('pressed');

    if (anyPressed) keystrokes.classList.add('pressed');
    else keystrokes.classList.remove('pressed');

    anyPressed = false
}

setInterval(handleInputs, 10);
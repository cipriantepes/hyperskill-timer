let difficulty_widget = document.querySelector('.difficulty-widget');
let seconds = 0;

function addTimer(el) {
    let div = document.createElement('div');
    let timer = document.createElement('span');
    let pause = document.createElement('button');
    let reset = document.createElement('button');

    // The main wrapper
    div.setAttribute('class', 'hyperskill hyperskill--timer difficulty-widget__timer d-flex align-items-center');
    div.textContent = 'Current session: ';

    // The timer wrapper
    timer.setAttribute('class', 'hyperskill__timer');
    timer.textContent = '0:00:00';

    // buttons
    pause.setAttribute('class', 'hyperskill__btn btn');
    pause.dataset['icon'] = 'pause';
    pause.addEventListener('click', ev => {
        if (ev.target.dataset['icon'] == 'pause') {
            clearInterval(hyperskill_timer);
            ev.target.dataset['icon'] = 'play';
        } else {
            hyperskill_timer = setInterval(() => countSeconds(timer), 1000);
            ev.target.dataset['icon'] = 'pause';
        }
    });

    // buttons
    reset.setAttribute('class', 'hyperskill__btn btn');
    reset.dataset['icon'] = 'reset';
    reset.addEventListener('click', ev => {
        if (pause.dataset['icon'] = 'pause') {
            seconds = 0;
        } else {
            pause.dataset['icon'] = 'pause';
        }
        clearInterval(hyperskill_timer);
        hyperskill_timer = setInterval(() => countSeconds(timer), 1000);
    });

    // Add all elements to the main wrapper
    div.appendChild(timer);
    div.appendChild(pause);
    div.appendChild(reset);

    // Attach to page
    el.appendChild(div);

    // Start the timer interval
    hyperskill_timer = setInterval(() => countSeconds(timer), 1000);
}

function countSeconds(el) {
    seconds += 1
    el.textContent = formatTime(seconds);
}

function formatTime(total) {
    let seconds = total;
    let minutes = 0;
    let hours = 0;
    let days = 0;

    if (seconds > 59) {
        minutes = (seconds - seconds % 60) / 60
        // seconds = 0;
    }
    if (minutes > 59) {
        hours = (minutes - minutes % 60) / 60
        // minutes *= 0;
    }
    if (minutes < 10) {
        minutes = '0' + +minutes
    }
    if (hours > 23) {
        days = (hours - hours % 60) / 24
        // hours *= 0;
    }

    seconds = total % 60

    if (seconds < 10) {
        seconds = '0' + +seconds
    }

    return `${hours}:${minutes}:${seconds}`
}

function checkLoadedDifficultyWidget() {
    if (document.querySelector('.difficulty-widget') != null) {
        // assigning to global as well
        difficulty_widget = document.querySelector('.difficulty-widget');
        addTimer(difficulty_widget);
        clearInterval(widgetLoaded);
        return true;
    }
    return false;
}

let widgetLoaded = setInterval(checkLoadedDifficultyWidget, 100)

// Remove interval if widget didn't load in 5 seconds
setTimeout(() => clearInterval(widgetLoaded), 1000 * 5)
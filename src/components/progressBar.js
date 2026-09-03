class ProgressBar {
    constructor(container) {
        this.container = container;

        this.value = 0;
        this.animated = false;
        this.hidden = false;

        this.radius = 40;
        this.circumference = 2 * Math.PI * this.radius;

        this.create();
        this.bindEvents();
        this.render();
    }

    create() {
        const element = document.createElement('div');
        element.classList.add('progress-block');

        const progress = document.createElement('div');
        progress.classList.add('progress');

        const svg = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'svg'
        );

        svg.setAttribute('viewBox', '0 0 100 100');

        const backgroundCircle = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'circle'
        );

        backgroundCircle.setAttribute('cx', '50');
        backgroundCircle.setAttribute('cy', '50');
        backgroundCircle.setAttribute('r', this.radius);

        backgroundCircle.setAttribute('fill', 'none');
        backgroundCircle.setAttribute('stroke', '#E5E5E5');
        backgroundCircle.setAttribute('stroke-width', '10');

        const circle = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'circle'
        );

        circle.setAttribute('cx', '50');
        circle.setAttribute('cy', '50');
        circle.setAttribute('r', this.radius);

        circle.setAttribute('fill', 'none');
        circle.setAttribute('stroke', '#005BFF');
        circle.setAttribute('stroke-width', '10');
        circle.setAttribute('stroke-linecap', 'round');

        circle.setAttribute(
            'transform',
            'rotate(-90 50 50)'
        );

        svg.append(
            backgroundCircle,
            circle
        );

        progress.append(svg);

        const controls = document.createElement('div');
        controls.classList.add('controls');

        const valueControl = document.createElement('label');
        valueControl.classList.add('control');

        const valueLabel = document.createElement('p');
        valueLabel.textContent = 'Value';

        const valueInput = document.createElement('input');

        valueInput.type = 'number';
        valueInput.min = '0';
        valueInput.max = '100';
        valueInput.value = this.value;
        valueInput.classList.add('value-input');

        valueControl.append(
            valueLabel,
            valueInput
        );

        const animatedControl = document.createElement('label');
        animatedControl.classList.add('control');

        const animatedLabel = document.createElement('p');
        animatedLabel.textContent = 'Animate';

        const animatedInput = document.createElement('input');

        animatedInput.type = 'checkbox';
        animatedInput.classList.add('switch');

        const animatedSwitch = document.createElement('span');
        animatedSwitch.classList.add('switch-ui');

        animatedControl.append(
            animatedLabel,
            animatedInput,
            animatedSwitch
        );

        const hiddenControl = document.createElement('label');
        hiddenControl.classList.add('control');

        const hiddenLabel = document.createElement('p');
        hiddenLabel.textContent = 'Hide';

        const hiddenInput = document.createElement('input');

        hiddenInput.type = 'checkbox';
        hiddenInput.classList.add('switch');

        const hiddenSwitch = document.createElement('span');
        hiddenSwitch.classList.add('switch-ui');

        hiddenControl.append(
            hiddenLabel,
            hiddenInput,
            hiddenSwitch
        );

        controls.append(
            valueControl,
            animatedControl,
            hiddenControl
        );

        element.append(
            progress,
            controls
        );

        this.container.append(element);

        this.element = element;
        this.progress = progress;
        this.circle = circle;

        this.valueInput = valueInput;
        this.animatedInput = animatedInput;
        this.hiddenInput = hiddenInput;
    }

    bindEvents() {
        this.valueInput.addEventListener('input', () => {
            this.setValue(this.valueInput.value);
        });

        this.animatedInput.addEventListener('change', () => {
            this.setAnimated(this.animatedInput.checked);
        });

        this.hiddenInput.addEventListener('change', () => {
            this.setHidden(this.hiddenInput.checked);
        });
    }

    setValue(value) {
        const number = Number(value);

        if (Number.isNaN(number)) {
            return;
        }

        this.value = Math.max(
            0,
            Math.min(100, number)
        );

        this.valueInput.value = this.value;

        this.render();
    }

    setAnimated(value) {
        this.animated = Boolean(value);

        this.animatedInput.checked = this.animated;

        this.render();
    }

    setHidden(value) {
        this.hidden = Boolean(value);

        this.hiddenInput.checked = this.hidden;

        this.render();
    }

    render() {
        const offset =
            this.circumference -
            (this.value / 100) * this.circumference;

        this.circle.style.strokeDasharray =
            this.circumference;

        this.circle.style.strokeDashoffset =
            offset;

        this.progress.classList.toggle(
            'progress--animated',
            this.animated
        );

        this.progress.classList.toggle(
            'progress--hidden',
            this.hidden
        );
    }
}

export default ProgressBar;
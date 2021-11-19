export default function (className: string) {
    let sliders = document.querySelector(className);
    let isDown = false;
    let startx: number;
    let scrollLeft: number;

    if (sliders != null) {
        addEvents(sliders)
    }

    function addEvents(slider: any) {
        slider.onmousedown = (e: any) => {
            isDown = true;
            slider.classList.add("active");
            startx = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        };

        slider.onmouseleave = () => {
            isDown = false;
            slider.classList.remove("active");
        };

        slider.onmouseup = () => {
            isDown = false;
            slider.classList.remove("active");
        };

        slider.onmousemove = (e: any) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startx) * 3;
            slider.scrollLeft = scrollLeft - walk;
        };
    }
}

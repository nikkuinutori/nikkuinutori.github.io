class GradientAnimation {
    constructor() {
        // Определение палитр для первого и второго цветов в формате RGB
        this.firstColorPaletteRGB = [
            [253, 42, 119],    
            [233, 30, 99],  
            [138, 74, 243],    
            [103, 58, 183],  
            [33, 150, 243],    
            [33, 12, 92],
        ];

        this.secondColorPaletteRGB = [
            [243, 42, 119, 0],
            [233, 30, 99, 0],
            [138, 74, 243, 0],  
            [103, 58, 183, 0],
            [33, 150, 243, 0],    
            [33, 12, 92, 0],
        ];


        this.cnv = document.querySelector('.discuss-container-canvas');
        this.ctx = this.cnv.getContext('2d');

        this.circlesNumber = 12;
        this.minRadius = 500;
        this.maxRadius = 500;
        this.speed = .005;

        (window.onresize = () => {
            this.setCanvasSize();
            this.createCircles();
        })();
        this.drawAnimation();
    }

    setCanvasSize() {
        this.w = this.cnv.width = innerWidth * devicePixelRatio;
        this.h = this.cnv.height = innerHeight * devicePixelRatio;
        this.ctx.scale(devicePixelRatio, devicePixelRatio);
    }

    createCircles() {
        this.circles = [];
        for (let i = 0; i < this.circlesNumber; i++) {
            this.circles.push(new Circle(
                this.w,
                this.h,
                this.minRadius,
                this.maxRadius,
                this.firstColorPaletteRGB,
                this.secondColorPaletteRGB
            ));
        }
    }

    drawCircles() {
        this.circles.forEach(circle => circle.draw(this.ctx, this.speed));
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.w, this.h);
    }

    drawAnimation() {
        this.clearCanvas();
        this.drawCircles();
        window.requestAnimationFrame(() => this.drawAnimation());
    }
}

class Circle {
    constructor(w, h, minR, maxR, firstColorPaletteRGB, secondColorPaletteRGB) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.angle = Math.random() * Math.PI * 2;
        this.radius = Math.random() * (maxR - minR) + minR;

        const randomFirstColorIndex = Math.floor(Math.random() * firstColorPaletteRGB.length);
        const randomSecondColorIndex = Math.floor(Math.random() * secondColorPaletteRGB.length);
        
        this.firstColor = `rgb(${firstColorPaletteRGB[randomFirstColorIndex].join(',')})`;
        this.secondColor = `rgba(${secondColorPaletteRGB[randomSecondColorIndex].join(',')})`;
    }

    draw(ctx, speed) {
        this.angle += speed;
        const x = this.x + Math.cos(this.angle) * 200;
        const y = this.y + Math.sin(this.angle) * 200;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.radius);
        gradient.addColorStop(0, this.firstColor);
        gradient.addColorStop(1, this.secondColor);

        ctx.globalCompositeOperation = `overlay`;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

window.onload = () => {
    new GradientAnimation();
}
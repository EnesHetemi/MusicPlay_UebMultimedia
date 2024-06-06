const app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight, backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 24,
    fill: '#ffffff',
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
});

const events = [
    { date: '2024-06-10', title: 'Rock Concert', description: 'A great rock concert in the city park.' },
    { date: '2024-06-15', title: 'Jazz Night', description: 'Smooth jazz night at the downtown club.' },
    { date: '2024-06-20', title: 'Pop Festival', description: 'A festival with the latest pop hits.' },
    { date: '2024-06-1', title: 'Rock Concert', description: 'A great rock concert in the city park.' },
    { date: '2024-06-6', title: 'Jazz Night', description: 'Smooth jazz night at the downtown club.' },
    { date: '2024-06-25', title: 'Pop Festival', description: 'A festival with the latest pop hits.' }
];

const calendarContainer = new PIXI.Container();
app.stage.addChild(calendarContainer);

const daysInMonth = 30;
const daySize = 50;
const margin = 10;
const daysPerRow = 7;

const calendarWidth = daysPerRow * (daySize + margin) - margin;
const calendarHeight = Math.ceil(daysInMonth / daysPerRow) * (daySize + margin) - margin;

const startX = (app.screen.width - calendarWidth) / 2;
const startY = (app.screen.height - calendarHeight) / 2;

for (let i = 0; i < daysInMonth; i++) {
    const day = new PIXI.Graphics();
    day.lineStyle(2, 0xFFFFFF, 1);
    day.beginFill(0x9966FF);
    day.drawRect(0, 0, daySize, daySize);
    day.endFill();
    day.x = startX + (i % daysPerRow) * (daySize + margin);
    day.y = startY + Math.floor(i / daysPerRow) * (daySize + margin);

    const dayText = new PIXI.Text((i + 1).toString(), style);
    dayText.x = day.x + 10;
    dayText.y = day.y + 10;

    day.interactive = true;
    day.buttonMode = true;

    const event = events.find(e => new Date(e.date).getDate() === (i + 1));
    if (event) {
        day.tint = 0xff0000;
        day.on('pointerdown', () => {
            showEventDetails(event);
        });
    }

    calendarContainer.addChild(day);
    calendarContainer.addChild(dayText);
}

function showEventDetails(event) {
    const modalContainer = new PIXI.Container();

    const background = new PIXI.Graphics();
    background.beginFill(0x000000, 0.8);
    background.drawRect(0, 0, app.screen.width, app.screen.height);
    background.endFill();

    const modalBox = new PIXI.Graphics();
    modalBox.beginFill(0xFFFFFF, 1);
    modalBox.drawRoundedRect(0, 0, 400, 300, 15);
    modalBox.endFill();
    modalBox.x = app.screen.width / 2 - 200;
    modalBox.y = app.screen.height / 2 - 150;

    const eventTitle = new PIXI.Text(event.title, { ...style, fill: '#ffffff' });
    eventTitle.x = modalBox.x + 200 - eventTitle.width / 2;
    eventTitle.y = modalBox.y + 30;

    const eventDescription = new PIXI.Text(event.description, { ...style, fill: '#ffffff', fontSize: 18 });
    eventDescription.x = modalBox.x + 195 - eventDescription.width / 2;
    eventDescription.y = modalBox.y + 85 - eventDescription.height / 2;

    modalContainer.addChild(background);
    modalContainer.addChild(modalBox);
    modalContainer.addChild(eventTitle);
    modalContainer.addChild(eventDescription);

    background.interactive = true;
    background.on('pointerdown', () => {
        app.stage.removeChild(modalContainer);
    });

    app.stage.addChild(modalContainer);
}
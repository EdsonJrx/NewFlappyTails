cnv = document.querySelector('canvas')
ctx = cnv.getContext('2d')

let n = 1 //frames animação
let count = 1 //tempo para frame
let f = 0 //
let altCano = Math.floor(Math.random()*4)*40
let cFrame
let gravity = 0.2

//drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
const sprite = new Image()
sprite.src = './assets/sprite.png'
const Tails = {
    dt:{
        dx: 40, dy: 0,
        dW: 60, dH: 55,
        vy:0
    },
    dframe:[
        {
            sx: 0, sy: 0,
            sW: 58, sH: 52,
        },
        {
            sx: 61, sy: 0,
            sW: 58, sH: 52,
        },
        {
            sx: 121, sy: 0,
            sW: 58, sH: 52,
        },
        {
            sx: 178.9, sy: 0,
            sW: 58, sH: 52,
        }
    ],
    dframe1:[
        {
            sx: 0, sy: 65,
            sW: 58, sH: 52,
        },
        {
            sx: 0, sy: 65,
            sW: 58, sH: 52,
        },
        {
            sx: 0, sy: 65,
            sW: 58, sH: 52,
        },
        {
            sx: 0, sy: 65,
            sW: 58, sH: 52,
        }
    ],
    dframe2:[
        {
            sx: 0, sy: 125,
            sW: 58, sH: 58,
        },
        {
            sx: 59, sy: 125,
            sW: 58, sH: 58,
        },
        {
            sx: 118, sy: 125,
            sW: 58, sH: 58,
        },
        {
            sx: 176, sy: 125,
            sW: 58, sH: 58,
        }
    ]
}

BackGround = {
    dx: 0, dy: 0,
    dW: 350, dH: 490,
    sx: 500, sy: 2,
    sW: 349, sH: 600,
}
const Pipe =[
    {
        dx: 350, dy: -30,
        dW: 100, dH: 320,
        sx: 241, sy: 0,
        sW: 95, sH: 320,
    },
    {
        dx: 350, dy: 400,
        dW: 100, dH: 320,
        sx: 340, sy: 0,
        sW: 95, sH: 320,
    },
]

const Ground =[
    {
        dx: 0, dy: 460,
        dW: 350, dH: 150,
        sx: 3, sy: 330,
        sW: 350, sH: 150,
    },
    {
        dx: 250, dy: 400,
        dW: 95, dH: 260,
        sx: 329, sy: 0,
        sW: 95, sH: 300,
    },
]


let animation = Tails.dframe
function DrawTails(n){
    ctx.drawImage(
        sprite, 
        animation[n].sx, animation[n].sy,
        animation[n].sW, animation[n].sH,
        Tails.dt.dx, Tails.dt.dy,
        Tails.dt.dW, Tails.dt.dH
    )
}
function DrawBGround(){
    ctx.drawImage(
        sprite, 
        BackGround.sx, BackGround.sy,
        BackGround.sW, BackGround.sH,
        BackGround.dx, BackGround.dy,
        BackGround.dW, BackGround.dH
    )
}

function DrawGround(){
    ctx.drawImage(
        sprite, 
        Ground[0].sx, Ground[0].sy,
        Ground[0].sW, Ground[0].sH,
        Ground[0].dx- f%350, Ground[0].dy,
        Ground[0].dW, Ground[0].dH
    )
    ctx.drawImage(
        sprite, 
        Ground[0].sx, Ground[0].sy,
        Ground[0].sW, Ground[0].sH,
        Ground[0].dx+350- f%350, Ground[0].dy,
        Ground[0].dW, Ground[0].dH
    )
}

function DrawPipes(){
    ctx.drawImage(
        sprite,
        Pipe[0].sx, Pipe[0].sy,
        Pipe[0].sW, Pipe[0].sH,
        Pipe[0].dx - f%450, Pipe[0].dy - altCano,
        Pipe[0].dW, Pipe[0].dH
    )
    ctx.drawImage(
        sprite,
        Pipe[1].sx, Pipe[1].sy,
        Pipe[1].sW, Pipe[1].sH,
        Pipe[1].dx - f%450, Pipe[1].dy - altCano,
        Pipe[1].dW, Pipe[1].dH
    )
}

cnv.addEventListener('click', function(){
    Tails.dt.vy = -5
},false)

// cnv.addEventListener('mouseup', function(){
//     animation = Tails.dframe
// },false)

function render(){
    count += 1
    if (count%7 == 0){
        n += 1
    }
    cFrame = n%4
    //console.log(cFrame)
    ctx.clearRect(0, 0, cnv.width, cnv.height)
    DrawBGround()
    DrawPipes()
    DrawGround()
    DrawTails(cFrame)
}

function update(){
    Tails.dt.vy += gravity
    Tails.dt.dy += Tails.dt.vy

    if(Tails.dt.dy + Tails.dt.dH - 10 >= Ground[0].dy){
        Tails.dt.dy = Ground[0].dy - Tails.dt.dH + 10
        animation = Tails.dframe1
        Tails.dt.vy *= -gravity*2
    } else if(Tails.dt.dy <= 0){
        Tails.dt.dy = 0
        Tails.dt.vy = 0
    }

    if((Tails.dt.dy+Tails.dt.dH - Ground[0].dy-10) == 0){
        f += 0
    } else {
        f += 4
    }

    if(f%450 == 0){
        altCano = Math.floor(Math.random()*4)*40
        console.log(altCano)
    }
}

function loop(){
    window.requestAnimationFrame(loop, cnv)
    update()
    render()

}

loop()
namespace SpriteKind {
    export const LevelPass = SpriteKind.create()
}
browserEvents.onMouseMove(function (x, y) {
    CurrentMouseX = x
})
info.onLifeZero(function () {
    game.gameOver(false)
    game.setGameOverMessage(false, "GAME OVER!")
})
controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    Render.jump(mySprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.LevelPass, function (sprite, otherSprite) {
    game.gameOver(true)
    game.setGameOverPlayable(true, music.melodyPlayable(music.magicWand), false)
    game.setGameOverMessage(true, "Congratulations, You Won!")
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprites.destroy(mySprite2)
    tiles.placeOnTile(mySprite2, tiles.getTileLocation(6, 6))
})
let enemyPath: tiles.Location[] = []
let deltaX = 0
let CurrentMouseX = 0
let mySprite2: Sprite = null
let mySprite: Sprite = null
mySprite = Render.getRenderSpriteVariable()
mySprite.setKind(SpriteKind.Player)
Render.setViewMode(ViewMode.raycastingView)
tiles.setCurrentTilemap(tilemap`maze`)
Render.setCeilingTilemap(tilemap`roof`)
scene.cameraFollowSprite(mySprite)
mySprite2 = sprites.create(assets.image`pc`, SpriteKind.Enemy)
let levelpass = sprites.create(assets.image`LevelPass`, SpriteKind.LevelPass)
tiles.placeOnTile(mySprite, tiles.getTileLocation(12, 14))
info.setLife(3)
tiles.placeOnRandomTile(levelpass, sprites.dungeon.floorDark2)
mySprite2.setScale(1, ScaleAnchor.Bottom)
tiles.placeOnTile(mySprite2, tiles.getTileLocation(6, 6))
let angle = 0
forever(function () {
    if (CurrentMouseX > 0) {
        deltaX = CurrentMouseX - 80
        if (deltaX < -10) {
            angle = angle + deltaX * 0.15
        }
        if (deltaX > 10) {
            angle = angle + deltaX * 0.15
        }
        Render.setViewAngleInDegree(angle)
        pause(20)
    }
})
game.onUpdateInterval(500, function () {
    enemyPath = scene.aStar(mySprite2.tilemapLocation(), mySprite.tilemapLocation())
    scene.followPath(mySprite2, enemyPath, 50)
})

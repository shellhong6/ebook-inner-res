/**
 * Created by JunSong on 2017/5/3.
 */
import GameData from './GameData.js';

export default class Enemy {
    constructor(config, game){
        this.config = config;
        this.game = game;
        this.init();
    }

    init(){
        let game = this.game, config = this.config;
        console.log('config', config);
        this.enemys = game.add.group();
        this.enemys.enableBody = true;
        this.enemys.createMultiple(config.selfPool, config.selfPic);
        this.enemys.setAll('outOfBoundsKill', true);
        this.enemys.setAll('checkWorldBounds', true);
        // 敌人的子弹
        this.enemyBullets = game.add.group();
        this.enemyBullets.enableBody = true;
        this.enemyBullets.createMultiple(config.bulletsPool, config.bulletPic);
        this.enemyBullets.setAll('outOfBoundsKill', true);
        this.enemyBullets.setAll('checkWorldBounds', true);
        // 敌人的随机位置范围
        this.maxWidth = game.width - game.cache.getImage(config.selfPic).width;
        // 产生敌人的定时器
        game.time.events.loop(Phaser.Timer.SECOND * config.selfTimeInterval, this.generateEnemy, this);
        // 敌人的爆炸效果
        this.explosions = game.add.group();
        this.explosions.createMultiple(config.explodePool, config.explodePic);
        this.explosions.forEach(function(explosion) {
            explosion.animations.add(config.explodePic);
        }, this);
    }
    // 产生敌人
    generateEnemy(){
        let game = this.game, config = this.config;
        var e = this.enemys.getFirstExists(false);
        if(e) {
            e.reset(game.rnd.integerInRange(66, this.maxWidth-66), 286-game.cache.getImage(config.selfPic).height);
            e.life = config.life;
            e.body.velocity.y = config.velocity;
        }
    }
    // 敌人开火
    enemyFire(){
        let game = this.game, config = this.config;
        this.enemys.forEachExists(function(enemy) {
            var bullet = this.enemyBullets.getFirstExists(false);
            if(bullet) {
                if(game.time.now > (enemy.bulletTime || 0)) {
                    bullet.reset(enemy.x + config.bulletX + 66, enemy.y + config.bulletY + enemy.height - 15);
                    bullet.body.velocity.y = config.bulletVelocity;
                    enemy.bulletTime = game.time.now + config.bulletTimeInterval;
                }
            }
        }, this);
    }
    // 打中了敌人
    hitEnemy(myBullet, enemy) {
        let game = this.game, config = this.config;
        //try {
        //    config.firesound.play();
        //} catch(e) {}
        myBullet.kill();
        enemy.life--;
        if(enemy.life <= 0) {
            //try {
            //    config.crashsound.play();
            //} catch(e) {}
            enemy.kill();
            var explosion = this.explosions.getFirstExists(false);
            explosion.reset(enemy.body.x - explosion.width/3, enemy.body.y - explosion.height/4);
            explosion.play(config.explodePic, 24, false, true);
            //GameData.score += config.score;
            GameData.hitedNums++;
            config.game.updateText();
        }
    }
}
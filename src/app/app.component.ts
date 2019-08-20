import { Component } from '@angular/core';
import { MazeService } from './service/maze.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputWidth = +prompt("Please enter the board width: ");
  inputHeight = +prompt("Please enter the board height: ");
  matrix; //Matrix
  mario; //player
  power; //power ups
  keycode; //key pressed event
  initPos; //initial position
  initPower; //inital power

  constructor(private mservice:MazeService){}

  ngOnInit(){
    if(this.inputWidth && this.inputHeight){
      //create matrix
      this.matrix = this.mservice.createMatrix(this.inputWidth, this.inputHeight); 
      
      //create mario position
      this.initPos = this.getMarioPosition(this.matrix,this.inputWidth, this.inputHeight );
      this.mservice.changePosition(this.inputWidth, this.inputHeight,this.initPos);
      this.mservice.currentPosition.subscribe( pos => this.mario = pos ); 
      
      //create power
      this.initPower = this.mservice.createPower(this.matrix,this.inputWidth, this.inputHeight,this.mario);
      this.mservice.changePower( this.initPower );
      this.mservice.currentPow.subscribe( pow => this.power = pow );
    }else{
      alert('Please refresh to play the game');
    }
  }

  ngAfterViewInit(){
    window.addEventListener('keyup', ( e ) => this.mservice.changePosition( this.inputWidth, this.inputHeight, this.mario, e.keyCode, this.power ) );
  }
  
  //get random position of mario
  getMarioPosition(matrix, inputWidth, inputHeight ){
    let marioWidth = Math.ceil(inputWidth/2);
    let marioHeight = Math.ceil(inputHeight/2);
    var random = matrix[marioWidth][marioHeight];
    return random;
  }
  

}

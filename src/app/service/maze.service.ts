import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MazeService {

  constructor() { }
  moves = 0;

  createMatrix(inputWidth,inputHeight){
    let matrix = new Array( inputWidth );
    for(let i = 0; i < inputWidth; i++){
      matrix[i] = new Array(inputHeight);
    }
    for(let i = 0; i < inputWidth; i++){
      for(let j = 0; j < inputHeight; j++){
        matrix[i][j] = `${i}${j}`;
      }
    }
    return matrix;
  }

  private position = new BehaviorSubject('00');
  private pow = new BehaviorSubject(['00']);

  currentPosition = this.position.asObservable();
  currentPow = this.pow.asObservable();

  createPower(matrix, m,n, mario){
    let power = new Array();
    if(m == n || m > n){
      length = m;
    }else{
      length = n;
    }
    for(let k = 0; k < length; k++ ){
      var random1 = Math.floor((Math.random() * (matrix.length)));
      var random = matrix[random1][Math.floor((Math.random() * (matrix[random1].length)))];
      power.push(random);
    }
    let newPowArr = power.filter( el => el !==  mario );
    this.pow.next(newPowArr);
    return newPowArr;
  }

  changePosition(width, height, position,key = null, power = null){
    let pos = position.split("");
    if(key == 38){
      if( +pos[0]-1 > -1 ){
        position = `${+pos[0]-1}${pos[1]}`;         
      }else{
        alert('Movement not allowed!');
        return false;     
      }      
    }else if(key == 40){
      if( +pos[0]+1 < width ){
        position = `${+pos[0]+1}${pos[1]}`;        
      }else{
        alert('Movement not allowed!');
        return false;
      }      
    }else if(key == 37){
      if( +pos[1]-1 > -1 ){
        position = `${pos[0]}${+pos[1]-1}`;        
      }else{
        alert('Movement not allowed!');
        return false;
      }
    }else if(key == 39){
      if( +pos[1]+1 < height ){
        position = `${pos[0]}${+pos[1]+1}`;        
      }else{
        alert('Movement not allowed!');
        return false;
      }
    }

    //counter
    if(key){
      this.moves += 1;
    }

    //Consume Power
    if(power){    
        if( power.indexOf(position) > -1 ){
          let newPowArr = power.filter( el => el !==  position );
          this.pow.next(newPowArr);
          if(newPowArr.length < 1){
            let gameOver = 'Game Over! Total moves to save princess:'+ this.moves;
            setTimeout(alert, 100, gameOver);  
          }
        }
    }

    this.position.next(position);
  }

  changePower( power ){
    this.pow.next( power );
  }


}

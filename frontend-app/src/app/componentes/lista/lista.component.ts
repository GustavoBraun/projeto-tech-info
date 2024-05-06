import { Component, OnInit } from '@angular/core';
import { ListService } from '../../servicos/list.service';
import { Veiculo } from '../../Veiculo';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {

  veiculos$ = new Observable<Veiculo[]>();

  placa: string = '';
  chassi: string = '';
  renavam: number = 0;
  marca: string = '';
  modelo: string = '';
  ano: number = 0;

  algumCampoVazio: boolean = false;

  veiculo = {
    placa: this.placa,
    chassi: this.chassi,
    renavam: this.renavam,
    marca: this.marca,
    modelo: this.modelo,
    ano: this.ano
  }

  constructor(private veiculoService: ListService){
    this.getVeiculos()
  }
  getVeiculos() {    
    this.veiculos$ = this.veiculoService.getAll();
  }

  removeVeiculo(id: number) {
    this.veiculoService.remove(id).subscribe(_=> this.getVeiculos());
    console.log(this.veiculos$);
    
  }

  postVeiculo(placa: string, chassi: string, renavam: number, marca: string, modelo: string, ano: number){

    this.algumCampoVazio = false;
    
    if (!placa || !chassi || !renavam || !marca || !modelo || !ano) {
      this.algumCampoVazio = true;
      console.log(this.algumCampoVazio);
    }

    if (this.algumCampoVazio === true) {
            //TODO 
    } else {
      this.veiculo.placa = placa;
      this.veiculo.chassi = chassi;
      this.veiculo.renavam = renavam;
      this.veiculo.marca = marca;
      this.veiculo.modelo = modelo;
      this.veiculo.ano = ano;
      this.veiculoService.post(this.veiculo).subscribe(_ => this.getVeiculos);
    }

  }

}



  
  
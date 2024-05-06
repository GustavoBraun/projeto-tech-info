import { Component } from '@angular/core';
import { VeiculoService } from './services/veiculo.service';
import { Veiculo } from './veiculo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'frontend-app';

  formularioParaAtualizar: boolean = false
  mensagemDeErro: boolean = false;
  id: number = 0
  veiculos$ = new Observable<Veiculo[]>();

  placa: string = '';
  chassi: string = '';
  renavam: number = 0;
  marca: string = '';
  modelo: string = '';
  ano: number = 0;

  veiculo = {
    placa: this.placa,
    chassi: this.chassi,
    renavam: this.renavam,
    marca: this.marca,
    modelo: this.modelo,
    ano: this.ano
  }

  placaAtualizar: string = '';
  chassiAtualizar: string = '';
  renavamAtualizar:  number = 0;
  marcaAtualizar: string = '';
  modeloAtualizar: string = '';
  anoAtualizar: number = 0;

  constructor(private veiculoService: VeiculoService) {
    this.getVeiculos()
  }
  getVeiculos() {
    this.veiculos$ = this.veiculoService.getAll();
  }

  removeVeiculo(id: number) {
    this.veiculoService.remove(id).subscribe(_ => this.getVeiculos());
    console.log(this.veiculos$);

  }

  postVeiculo() {
    this.veiculo = {
      placa: this.placa,
      chassi: this.chassi,
      renavam: this.renavam,
      marca: this.marca,
      modelo: this.modelo,
      ano: this.ano
    }

    if (!this.placa || !this.chassi || !this.renavam || !this.marca || !this.modelo || !this.ano) {
      this.mensagemDeErro = true;
    } else {
      this.veiculoService.post(this.veiculo).subscribe(() => this.getVeiculos());
      this.mensagemDeErro = false;
    }
  }

  putVeiculo(id: number) {

    this.veiculo = {
      placa: this.placaAtualizar,
      chassi: this.chassiAtualizar,
      renavam: this.renavamAtualizar,
      marca: this.marcaAtualizar,
      modelo: this.modeloAtualizar,
      ano: this.anoAtualizar
    }
    if (!this.placaAtualizar || !this.chassiAtualizar || !this.renavamAtualizar || !this.marcaAtualizar || !this.modeloAtualizar || !this.anoAtualizar) {
      this.mensagemDeErro = true;

    } else {
      this.veiculoService.put(this.veiculo, id).subscribe(() => this.getVeiculos())
      this.formularioParaAtualizar = false;
      this.mensagemDeErro = false;
    }
  }

  mostrarFormularioParaAtualizar(id: number) {
    this.formularioParaAtualizar = !this.formularioParaAtualizar;
    this.id = id;
  }

}

import { use, expect } from "chai";
import chaiHttp from "chai-http";
import chaiAsPromised from "chai-as-promised";
import { app } from "../src/index.js";
import { VeiculoService } from "../src/service/veiculo.service.js";

const chai = use(chaiHttp, chaiAsPromised);
const veiculoService = new VeiculoService;

describe('Veiculo', () => {

    let id;

    it('Listar veiculos deve retornar uma lista de veiculos e um status 200 OU retornar uma linha dizendo que a lista está vazia e um status 404 quando não houver veiculos cadastrados', (done) => {
        chai.request(app)
            .get('/veiculo')
            .end((err, res) => {
                if (Object.keys(res.body).length === 0 ) {
                    expect(res).to.have.status(404);
                    expect(res.text).to.equal('Lista vazia.')
                } else {
                    expect(res).to.have.status(200)
                }
                done();
            });
    });

    it('Criar novo veiculo deve retornar o novo veiculo com os campos id, placa, chassi, renavam, modelo, marca e ano e o status 201', (done) => {
        var novoVeiculo = {
            "placa": "NAX9111",
            "chassi": "2NV s5p0R8 Td 118036",
            "renavam": 87730328207,
            "modelo": "TOPIC FURGAO L 2.2 8V/ 2.0 16V 4p",
            "marca": "JINBEI",
            "ano": 2009
        }
        chai.request(app)
            .post('/veiculo')
            .send(novoVeiculo)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('novoVeiculo');
                expect(res.body.novoVeiculo).to.have.property('_id').that.is.a('number');
                expect(res.body.novoVeiculo).to.have.property('_placa').that.is.a('string');
                expect(res.body.novoVeiculo).to.have.property('_chassi').that.is.a('string');
                expect(res.body.novoVeiculo).to.have.property('_renavam').that.is.a('number');
                expect(res.body.novoVeiculo).to.have.property('_modelo').that.is.a('string');
                expect(res.body.novoVeiculo).to.have.property('_marca').that.is.a('string');
                expect(res.body.novoVeiculo).to.have.property('_ano').that.is.a('number');
                expect(res.body.novoVeiculo._placa).to.equal("NAX9111");
                expect(res.body.novoVeiculo._chassi).to.equal("2NV s5p0R8 Td 118036");
                expect(res.body.novoVeiculo._renavam).to.equal(87730328207);
                expect(res.body.novoVeiculo._modelo).to.equal("TOPIC FURGAO L 2.2 8V/ 2.0 16V 4p");
                expect(res.body.novoVeiculo._marca).to.equal("JINBEI");
                expect(res.body.novoVeiculo._ano).to.equal(2009);
                id = res.body.novoVeiculo._id;
                done();
            });
    });

    it('Listar veiculos deve retornar uma lista de veiculos e um status 200 OU retornar uma linha dizendo que a lista está vazia e um status 404 quando não houver veiculos cadastrados', (done) => {
        chai.request(app)
            .get('/veiculo')
            .end((err, res) => {
                if (Object.keys(res.body).length === 0 ) {
                    expect(res).to.have.status(404);
                    expect(res.text).to.equal('Lista vazia.')
                } else {
                    expect(res).to.have.status(200)
                }
                done();
            });
    });

    it('Criar novo veiculo deve retornar um status 400 e uma linha pedindo para preencher todos os campos quando um ou mais campos não foram preenchidos quando um ou mais campos não forem preenchidos', (done) => {
        var novoVeiculo = {
            "chassi": "2NV s5p0R8 Td 118036",
            "renavam": 87730328207,
            "modelo": "TOPIC FURGAO L 2.2 8V/ 2.0 16V 4p",
            "ano": 2009
        }
        chai.request(app)
            .post('/veiculo')
            .send(novoVeiculo)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.error.text).to.equal('Por favor, preencha todos os campos.');
                done();
            });
    });

    it('Listar veiculo pelo ID deve retornar um veiculo escolhido pelo ID com os campos placa, chassi, renavam, modelo, marca e ano e o status 200', (done) => {
        chai.request(app)
            .get('/veiculo/' + id)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('placa').that.is.a('string');
                expect(res.body).to.have.property('chassi').that.is.a('string');
                expect(res.body).to.have.property('renavam').that.is.a('number');
                expect(res.body).to.have.property('modelo').that.is.a('string');
                expect(res.body).to.have.property('marca').that.is.a('string');
                expect(res.body).to.have.property('ano').that.is.a('number');
                done();
            });
    });

    it('Listar veiculo pelo ID deve retornar uma linha dizendo que o veiculo não foi encontrado e status 404 quando o veículo não existir', (done) => {
        chai.request(app)
            .get('/veiculo/' + 99999)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.error.text).to.equal('Veiculo não encontrado.');
                done();
            });
    });


    it('Atualizar um veiculo pelo ID deve retornar o novo veiculo com os campos placa, chassi, renavam, modelo, marca e ano e o status 200', (done) => {
        veiculoService.listOne(id).then(veiculoAntesDoPutParaComparacao => {
            const veiculoParaAlteracao = {
                "placa": "ABC1234",
                "chassi": "2MJ hf913f Dt 118036",
                "renavam": 924651328207,
                "modelo": "TOPIC BARAO L 2.9 81V/ 2.0 16V 4p",
                "marca": "JIBOIA",
                "ano": 2019
            }
            chai.request(app)
                .put('/veiculo/' + id)
                .send(veiculoParaAlteracao)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('_placa').that.is.a('string');
                    expect(res.body).to.have.property('_chassi').that.is.a('string');
                    expect(res.body).to.have.property('_renavam').that.is.a('number');
                    expect(res.body).to.have.property('_modelo').that.is.a('string');
                    expect(res.body).to.have.property('_marca').that.is.a('string');
                    expect(res.body).to.have.property('_ano').that.is.a('number');
                    expect(res.body._placa).to.equal("ABC1234");
                    expect(res.body._chassi).to.equal("2MJ hf913f Dt 118036");
                    expect(res.body._renavam).to.equal(924651328207);
                    expect(res.body._modelo).to.equal("TOPIC BARAO L 2.9 81V/ 2.0 16V 4p");
                    expect(res.body._marca).to.equal("JIBOIA");
                    expect(res.body._ano).to.equal(2019);
                    expect(res.body._placa).not.equal(veiculoAntesDoPutParaComparacao.placa);
                    expect(res.body._chassi).not.equal(veiculoAntesDoPutParaComparacao.chassi);
                    expect(res.body._renava).not.equal(veiculoAntesDoPutParaComparacao.renavam);
                    expect(res.body._modelo).not.equal(veiculoAntesDoPutParaComparacao.modelo);
                    expect(res.body._marca).not.equal(veiculoAntesDoPutParaComparacao.marca);
                    expect(res.body._ano).not.equal(veiculoAntesDoPutParaComparacao.ano);
                })
        })
        done();
    });

    it('Atualizar veiculo deve retornar a mensagem "Veiculo não encontrado" e o status 404 quando tentar atualizar um veiculo que não existe', (done) => {
        const veiculoParaAlteracao = {
            "placa": "ABC1234",
            "chassi": "2MJ hf913f Dt 118036",
            "renavam": 924651328207,
            "modelo": "TOPIC BARAO L 2.9 81V/ 2.0 16V 4p",
            "marca": "JIBOIA",
            "ano": 2019
        }
        chai.request(app)
            .put('/veiculo/' + 9999)
            .send(veiculoParaAlteracao)
            .end((err, res) => {
                expect(res.text).to.equal('Veiculo não encontrado.');
                expect(res).to.have.status(404);
                done();
            })
    });

    it('Atualizar veiculo deve retornar um status 400 e uma linha pedindo para preencher todos os campos quando um ou mais campos não foram preenchidos', (done) => {
        var novoVeiculo = {
            "placa": "ABC1234",
            "chassi": "2MJ hf913f Dt 118036",
            "renavam": 924651328207,
            "marca": "JIBOIA",
        }
        chai.request(app)
            .put('/veiculo/' + 9999)
            .send(novoVeiculo)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.error.text).to.equal('Por favor, preencha todos os campos.');
                done();
            })
    });
    
    it('Deve deletar o veiculo pelo ID retornando uma mensagem "Veiculo deletado" e o status 200', (done) => {
        chai.request(app)
            .delete('/veiculo/' + id)
            .end((err, res) => {
                expect(res.text).to.equal('Veiculo deletado.');
                expect(res).to.have.status(200);
                done();
            })
    });
    
    it('Deletar veiculo deve retornar a mensagem "Veiculo não encontrado" e o status 400 quando tentar atualizar um veiculo que não existe', (done) => {
        chai.request(app)
            .delete('/veiculo/' + 9999)
            .end((err, res) => {
                expect(res.text).to.equal('Veiculo não encontrado.');
                expect(res).to.have.status(404);
                done();
            })
    });
});
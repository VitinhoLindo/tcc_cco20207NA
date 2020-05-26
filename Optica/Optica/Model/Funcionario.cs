using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Optica.Model
{
    class Funcionario : PessoaFisica
    {
        private long carteiraTrabalho;
        private Funcao funcao;
        private Filiais lotacao;
        private Fardamento fardamento;
        private Contatos contato;
        private Enderecos endereco;



        public long CarteiraTrabalho
        {
            get { return this.carteiraTrabalho; }
            set { this.carteiraTrabalho = value; }
        }
        public Funcao Funcao
        {
            get { return this.funcao; }
            set { this.funcao = value; }
        }
        public Filiais Lotacao
        {
            get { return this.lotacao; }
            set { this.lotacao = value; }
        }
        public Fardamento Fardamento
        {
            get { return this.fardamento; }
            set { this.fardamento = value; }
        }
        public Contatos Contato
        {
            get { return this.contato; }
            set { this.contato = value; }
        }
        public Enderecos Endereco
        {
            get { return this.endereco; }
            set { this.endereco = value; }
        }
    }
}

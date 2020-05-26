using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Optica.Model
{
    class PessoaFisica
    {
        private int id;
        private long cpf;
        private long rg;
        private string nome;
        private string caracteristicas;
        private string sexo;
        private DateTime dataNascimento;

        public PessoaFisica()
        {

        }

        public PessoaFisica(int id, long cpf, long rg, string nome, string caracteristicas, string sexo, DateTime dataNascimento) : this()
        {
            this.Id = id;
            this.Cpf = cpf;
            this.Rg = rg;
            this.Nome = nome;
            this.Caracteristicas = caracteristicas;
            this.Sexo = sexo;
            this.DataNascimento = dataNascimento;
        }

        public int Id
        {
            get { return this.id; }
            set { this.id = value; }
        }
        public long Cpf
        {
            get { return this.cpf; }
            set { this.cpf = value; }
        }
        public long Rg
        {
            get { return this.rg; }
            set { this.rg = value; }
        }
        public string Nome
        {
            get { return this.nome; }
            set { this.nome = value; }
        }
        public string Caracteristicas
        {
            get { return this.caracteristicas; }
            set { this.caracteristicas = value; }
        }
        public string Sexo
        {
            get { return this.sexo; }
            set { this.sexo = value; }
        }
        public DateTime DataNascimento
        {
            get { return this.dataNascimento; }
            set { this.dataNascimento = value; }
        }
    }
}

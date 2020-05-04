using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Optica.Model
{
    class Enderecos
    {
        private int id;
        private long cep;
        private string pais;
        private string estado;
        private string cidade;
        private string bairro;
        private string endereco;
        private string complemento;

        public Enderecos ()
        {

        }

        public Enderecos(int id, long cep, string pais, string estado, string cidade, string bairro, string endereco, string complemento) : this()
        {
            this.Id = id;
            this.Cep = cep;
            this.Pais = pais;
            this.Estado = estado;
            this.Cidade = cidade;
            this.Bairro = bairro;
            this.Endereco = endereco;
            this.Complemento = complemento;
        }

        public int Id { 
            get { return this.id; } 
            set { this.id = value; } 
        }

        public long Cep {
            get { return this.cep; }
            set { this.cep = value; } 
        }

        public string Pais { 
            get { return this.pais; } 
            set { this.pais = value; } 
        }

        public string Estado { 
            get { return this.estado; } 
            set { this.estado = value; } 
        }

        public string Cidade {
            get {  return this.cidade; }
            set { this.cidade = value; }
        }

        public string Bairro 
        {
            get { return this.bairro; } 
            set { this.bairro = value; } 
        }
        
        public string Endereco
        {
            get { return this.endereco; }
            set { this.endereco = value; } 
        }

        public string Complemento { 
            get { return this.complemento; } 
            set { this.complemento = value; } 
        }
    }
}

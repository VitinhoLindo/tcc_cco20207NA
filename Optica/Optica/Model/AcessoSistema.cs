using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Optica.Model
{
    class AcessoSistema
    {
        private int id;
        private Funcionario cadastro;
        private string login;
        private string senha;

        public AcessoSistema(string login, string senha)
        {
            this.Login = login;
            this.Senha = senha;
        }

        public AcessoSistema(int id, Funcionario cadastro, string login, string senha) : this(login, senha)
        {
            this.Id = id;
            this.Cadastro = cadastro;
        }

        public int Id
        {
            get { return this.id; }
            set { this.id = value; }
        }
        public string Login
        {
            get { return this.login; }
            set { this.login = value; }
        }
        public string Senha
        {
            get { return this.senha; }
            set { this.senha = value; }
        }
        public Funcionario Cadastro
        {
            get { return this.cadastro; }
            set { this.cadastro = value; }
        }
    }
}

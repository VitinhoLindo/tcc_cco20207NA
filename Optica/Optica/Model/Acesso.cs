using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Optica.Model
{
    class Acesso
    {
        private int id;
        private Funcionario funcionario;
        private string login;
        private string senha;

        public Acesso(string login, string senha)
        {
            this.Login = login;
            this.Senha = senha;
        }

        public Acesso(int id, Funcionario funcionario, string login, string senha) : this(login, senha)
        {
            this.Id = id;
            this.Funcionario = funcionario;
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
        public Funcionario Funcionario
        {
            get { return this.funcionario; }
            set { this.funcionario = value; }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Optica.Model;

namespace Optica.Controller
{
    class AcessoSistemaController
    {
        private AcessoSistema acesso;

        public AcessoSistema AcessarSistema(string login, string senha)
        {
            if (login.Length <= 5 || senha.Length <= 5) 
                return null;
            this.acesso = new AcessoSistema(login, senha);

            return this.acesso;
        }

        public AcessoSistema Acesso
        {
            get { return this.acesso; }
            set { this.acesso = value; }
        }
    }
}

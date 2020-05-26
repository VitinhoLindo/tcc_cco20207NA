using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Optica.Model;
using Optica.Services;
using Optica.View;
using System.Windows.Forms;


namespace Optica.Controller
{
    class AcessoSistemaController
    {
        private Acesso acesso;

        private Funcao getFuncao(dynamic funcao)
        {
            return null;
        }

        public Acesso AcessarSistema(string login, string senha)
        {
            dynamic responseApi = (new AcessoSistemaService()).AcessarSistema(new Acesso(login, senha));
            //Message
            return null;
        }

        public Acesso Acesso
        {
            get { return this.acesso; }
            set { this.acesso = value; }
        }
    }
}

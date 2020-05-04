using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Optica.View;
using Optica.Model;

namespace Optica.Controller
{
    class MainController
    {
        private MenuForm menu = new MenuForm();
        private Acesso acesso;
        private Loading loading;
        private AcessoSistemaForm acessoSistemaForm;
        private AcessoSistemaController acessoSistemaController = new AcessoSistemaController();

        public MainController()
        {

        }

        public dynamic SingIn(string user, string key)
        {
            if (user.Length < 5 )
            {
                return new
                {
                    status = false,
                    message = "Minimo exigido para login é 5 caracteres",
                    head = "Acesso Negado"
                };
            }

            if ( key.Length < 5) {
                return new {
                    status = false,
                    message = "Minimo exigido para login e senha é 5 caracteres",
                    head = "Acesso Negado"
                };
            };

            if (user == "admin" && key == "admin")
                this.acesso = new Acesso(user, key);

            return (this.acesso != null) ? new
            {
                status = true,
                message = "Bem Vindo",
                head = "Acesso Permitido"
            } : new
            {
                status = false,
                message = "Login ou senha incorreto.",
                head = "Acesso Negado"
            };
        }

        public bool Loggout()
        {
            this.acesso = null;
            return true;
        }

        public MenuForm Menu
        {
            get { return this.menu; }
            set { this.menu = value; }
        }

        public Acesso Acesso
        {
            get { return this.acesso; }
            set { this.acesso = value; }
        }

        public Loading Loading
        {
            get { return this.loading; }
            set { this.loading = value; }
        }

        public AcessoSistemaForm AcessoSistemaForm
        {
            get { return this.acessoSistemaForm; }
            set { this.acessoSistemaForm = value; }
        }
    }
}

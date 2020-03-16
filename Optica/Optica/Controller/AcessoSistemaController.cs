using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Optica.Model;
using Optica.Services;
using Optica.View;


namespace Optica.Controller
{
    class AcessoSistemaController
    {
        private Loading loading;
        private AcessoSistema acesso;
        private AcessoSistemaService service = new AcessoSistemaService();

        public AcessoSistema AcessarSistema(string login, string senha)
        {
            if (login.Length <= 5 || senha.Length <= 5) 
                return null;
            this.loading = new Loading();
            this.loading.Show();

            //for (int x = 0; x < 1000000000; x++) ;

            //this.loading.progress(5);

            //for (int x = 0; x < 1000000000; x++) ;

            //this.loading.progress(25);

            //for (int x = 0; x < 1000000000; x++) ;

            //this.loading.progress(63);

            //for (int x = 0; x < 1000000000; x++) ;

            //this.loading.progress(99);
            //this.loading;
            //this.acesso = new AcessoSistema(login, senha);
            //object responseApi = service.AcessarSistema(this.acesso);

            //for (int x = 0; x < 1000000000; x++) ;


            this.loading.Close();
            return null;
        }

        public AcessoSistema Acesso
        {
            get { return this.acesso; }
            set { this.acesso = value; }
        }
    }
}

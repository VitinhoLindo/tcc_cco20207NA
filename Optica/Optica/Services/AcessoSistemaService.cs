using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Optica.Model;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Windows.Forms;


namespace Optica.Services
{
    class AcessoSistemaService
    {
        private HttpClient httpClient = new HttpClient();
        private string loginUserUrl = "";

        public AcessoSistema AcessarSistema(AcessoSistema model)
        {
            Task<AcessoSistema> response = this.PostAcessoSistema(model);
            response.Wait();

            return response.Result;
        }

        private async Task<AcessoSistema> PostAcessoSistema(AcessoSistema model)
        {
            var response = await this.httpClient.PostAsJsonAsync(this.loginUserUrl, model);
            MessageBox.Show(response.ToString());
            //
            //HttpResponseMessage response = await this.httpClient.Po;
            //HttpRequestMessage response = await this.httpClient.PostAsJsonAsync("", model);
            //HttpResponseMessage response = await this.httpClient.
            //(new Uri(this.loginUser), model);

            return new AcessoSistema("abc", "cde");
        }
    }
}

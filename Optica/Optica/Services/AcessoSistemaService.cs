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
        private string loginUserUrl = "http://10.0.0.106:80/";

        public AcessoSistemaService()
        {
        }

        public object AcessarSistema(AcessoSistema model)
        {
            return this.PostAcessoSistema(model);
        }

        private object PostAcessoSistema(AcessoSistema model)
        {
            this.httpClient.BaseAddress = new Uri(this.loginUserUrl);
            this.httpClient.DefaultRequestHeaders.Accept.Clear();
            this.httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = this.httpClient.PostAsJsonAsync("api/v1/user/", model).Result;

            if (response.IsSuccessStatusCode)
            {
                return response.Content.ReadAsAsync<object>().Result;
            }

            return null;
        }
    }
}

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
    class AcessoSistemaService : RequestService
    {
        public AcessoSistemaService()
        {
        }

        public object AcessarSistema(AcessoSistema model)
        {
            return this.PostAcessoSistema(model);
        }

        private object PostAcessoSistema(AcessoSistema model)
        {
            this.Request.BaseAddress = this.Url;
            this.Request.DefaultRequestHeaders.Accept.Clear();
            this.Request.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = this.Request.PostAsJsonAsync("api/v1/user/", model).Result;

            if (response.IsSuccessStatusCode)
            {
                return response.Content.ReadAsAsync<object>().Result;
            }

            return null;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net.Http.Headers;

namespace Optica.Services
{
    class RequestService
    {
        private HttpClient request = new HttpClient();
        private Uri url = new Uri("http://10.0.0.109:80/");

        public HttpClient Request
        {
            get { return this.request; }
        }

        public Uri Url
        {
            get { return this.url; }
        }
    }
}

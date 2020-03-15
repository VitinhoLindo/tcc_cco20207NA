using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net.Http.Headers;

namespace Optica.Services
{
    class Requests
    {
        private HttpClient request;

        public Requests (string url)
        {
            
        }

        public HttpClient Request
        {
            get { return this.request; }
            set { this.request = value; }
        }
    }
}

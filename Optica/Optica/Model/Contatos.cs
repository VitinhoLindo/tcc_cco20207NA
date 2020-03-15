using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Optica.Model
{
    class Contatos
    {
        private int id;
        private string email;
        private string emailComplementar;
        private long telefoneFixo;
        private long telefoneFixoComplementar;
        private long telefoneMovel;
        private long telefoneMovelComplementar;

        public Contatos(int id, string email, string emailComplementar, long telefoneFixo, long telefoneFixoComplementar, long telefoneMovel, long telefoneMovelComplementar)
        {
            this.Id = id;
            this.Email = email;
            this.EmailComplementar = emailComplementar;
            this.TelefoneFixo = telefoneFixo;
            this.TelefoneFixoComplementar = telefoneFixoComplementar;
            this.TelefoneMovel = telefoneMovel;
            this.TelefoneMovelComplementar = telefoneMovelComplementar;
        }

        public int Id
        {
            get { return this.id; }
            set { this.id = value; }
        }

        public string Email
        {
            get { return this.email; }
            set { this.email = value; }
        }

        public string EmailComplementar
        {
            get { return this.emailComplementar; }
            set { this.emailComplementar = value; }
        }

        public long TelefoneFixo
        {
            get { return this.telefoneFixo; }
            set { this.telefoneFixo = value; }
        }

        public long TelefoneFixoComplementar
        {
            get { return this.telefoneFixoComplementar; }
            set { this.telefoneFixoComplementar = value; }
        }

        public long TelefoneMovel
        {
            get { return this.telefoneMovel; }
            set { this.telefoneMovel = value; }
        }

        public long TelefoneMovelComplementar
        {
            get { return this.telefoneMovelComplementar; }
            set { this.telefoneMovelComplementar = value; }
        }
    }
}

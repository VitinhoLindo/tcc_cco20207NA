using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Optica.View
{
    public partial class EnderecoForm : Form
    {
        private CadastroClienteForm CadastroClienteForm;
        public EnderecoForm(CadastroClienteForm cadastroClienteForm)
        {
            InitializeComponent();
            this.CadastroClienteForm = cadastroClienteForm;
        }

        private void EnderecoForm_FormClosed(object sender, FormClosedEventArgs e)
        {
            this.CadastroClienteForm.ClearFormOpened();
        }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Optica.Controller;

namespace Optica.View
{
    public partial class CadastroFuncionarioForm : Form
    {
        private ContatoForm ContatoForm;
        private EnderecoForm EnderecoForm;
        private PerfilForm PerfilForm;

        private string formOpened;

        public CadastroFuncionarioForm()
        {
            InitializeComponent();
        }

        public void CloseForm()
        {
            switch (this.formOpened)
            {
                case "ContatoForm":
                    this.ContatoForm.Close();
                    this.ClearFormOpened();
                    break;
                case "EnderecoForm":
                    this.EnderecoForm.Close();
                    this.ClearFormOpened();
                    break;
                case "PerfilForm":
                    this.PerfilForm.Close();
                    this.ClearFormOpened();
                    break;
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {

        }

        private void button3_Click(object sender, EventArgs e)
        {
            this.CloseForm();
            this.ContatoForm = new ContatoForm(this);
            this.formOpened = "ContatoForm";
            this.ContatoForm.Show();
        }

        private void button4_Click(object sender, EventArgs e)
        {
            this.CloseForm();
            this.EnderecoForm = new EnderecoForm(this);
            this.formOpened = "EnderecoForm";
            this.EnderecoForm.Show();
        }

        private void button5_Click(object sender, EventArgs e)
        {
            this.CloseForm();
            this.PerfilForm = new PerfilForm(this);
            this.formOpened = "PerfilForm";
            this.PerfilForm.Show();
        }

        public void ClearFormOpened()
        {
            this.formOpened = "";
        }
    }
}

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
using Optica.Model;

namespace Optica.View
{
    public partial class MenuForm : Form
    {
        private AcessoSistemaForm acessoSistemaForm;
        private CadastroClienteForm CadastroClienteForm;
        private CadastroFuncionarioForm CadastroFuncionarioForm;
        private string formOpened;

        public MenuForm()
        {
            InitializeComponent();
        }

        private void ClearPanel()
        {
            switch (this.formOpened)
            {
                case "CadastroClienteForm":
                    this.panel2.Controls.Remove(this.CadastroClienteForm);
                    this.CadastroClienteForm.Close();
                    break;
                case "CadastroFuncionarioForm":
                    this.panel2.Controls.Remove(this.CadastroFuncionarioForm);
                    this.CadastroFuncionarioForm.Close();
                    break;
            }
        }

        private void OnResize()
        {
            dynamic OffSet;
            switch (this.formOpened)
            {
                case "CadastroClienteForm":
                    OffSet = this.GetOffSet();
                    this.CadastroClienteForm.Width = OffSet.SeccondPanelWidth;
                    this.CadastroClienteForm.Height = OffSet.SeccondPanelHeight;
                    break;
                case "CadastroFuncionarioForm":
                    OffSet = this.GetOffSet();
                    this.CadastroFuncionarioForm.Width = OffSet.SeccondPanelWidth;
                    this.CadastroFuncionarioForm.Height = OffSet.SeccondPanelHeight;
                    break;
            }
        }

        private void tableLayoutPanel1_Paint(object sender, PaintEventArgs e)
        {

        }

        private void MenuClose(object sender, FormClosedEventArgs e)
        {
            this.AcessoSistemaForm.Loggout();
        }

        public AcessoSistemaForm AcessoSistemaForm
        {
            get { return this.acessoSistemaForm; }
            set { this.acessoSistemaForm = value; }
        }

        private dynamic GetOffSet()
        {
            return new
            {
                FormWidth = this.Width,
                FormHeight = this.Height,
                FirstPanelWidth = this.panel1.Width,
                FirstPanelHeight = this.panel1.Height,
                SeccondPanelWidth = this.panel2.Width,
                SeccondPanelHeight = this.panel2.Height
            };
        }

        /**
         * Cadastro Cliente
         */
        private void button1_Click(object sender, EventArgs e)
        {
            this.ClearPanel();

            dynamic OffSet = this.GetOffSet();
            this.CadastroClienteForm = new CadastroClienteForm()
            {
                Width = OffSet.SeccondPanelWidth,
                Height = OffSet.SeccondPanelHeight,
                TopLevel = false,
                TopMost = true
            };
            this.panel2.Controls.Add(this.CadastroClienteForm);
            this.CadastroClienteForm.Show();
            this.formOpened = "CadastroClienteForm";
        }

        private void button2_Click(object sender, EventArgs e)
        {
            this.ClearPanel();

            dynamic OffSet = this.GetOffSet();
            this.CadastroFuncionarioForm = new CadastroFuncionarioForm()
            {
                Width = OffSet.SeccondPanelWidth,
                Height = OffSet.SeccondPanelHeight,
                TopLevel = false,
                TopMost = false
            };
            this.panel2.Controls.Add(this.CadastroFuncionarioForm);
            this.CadastroFuncionarioForm.Show();
            this.formOpened = "CadastroFuncionarioForm";
        }


        private void MenuForm_Resize(object sender, EventArgs e)
        {
            this.OnResize();
        }
    }
}

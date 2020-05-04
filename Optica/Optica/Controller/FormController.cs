using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Optica.View;
using System.Windows.Forms;

namespace Optica.Controller
{
    class FormController
    {
        private MenuForm menuForm;
        private CadastroClienteForm CadastroClienteForm;
        private string formOpened;

        public FormController(MenuForm MenuForm_c) {
            this.MenuForm = MenuForm_c;
        }

        public dynamic OffsetPanel(Panel panel)
        {
            return new
            {
                Width = panel.Width,
                Height = panel.Height
            };
        }

        private void ClearPanel (Panel panel)
        {
            switch(this.formOpened)
            {
                case "CadastroClienteForm":
                    panel.Controls.Remove(this.CadastroClienteForm);
                    this.CadastroClienteForm.Close();
                    break;
            }
        }

        public void CadastroCliente(Panel panel)
        {
            if (this.formOpened != "CadastroClienteForm")
            {
                this.ClearPanel(panel);
                dynamic offset = this.OffsetPanel(panel);
                this.CadastroClienteForm = new CadastroClienteForm();

                this.formOpened = "CadastroClienteForm";

                CadastroClienteForm.Width = offset.Width;
                CadastroClienteForm.Height = offset.Height;

                panel.Controls.Add(this.CadastroClienteForm);
                this.CadastroClienteForm.Show();
            }
        }

        public void CadastroFuncionario(Panel panel)
        {

        }



        public MenuForm MenuForm
        {
            get { return this.menuForm; }
            set { this.menuForm = value; }
        }
    }
}

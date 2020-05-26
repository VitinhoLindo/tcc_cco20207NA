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
    public partial class ContratoFuncionarioForm : Form
    {
        private ContratoForm ContratoForm;
        private FardamentoForm FardamentoForm;
        private FuncaoForm FuncaoForm;
        private string formOpened = "";

        public ContratoFuncionarioForm()
        {
            InitializeComponent();
        }

        public void CloseForm()
        {
            switch (this.formOpened)
            {
                case "ContratoForm":
                    this.ContratoForm.Close();
                    this.ClearFormOpened();
                    break;
                case "FardamentoForm":
                    this.FardamentoForm.Close();
                    this.ClearFormOpened();
                    break;
                case "FuncaoForm":
                    this.FuncaoForm.Close();
                    this.ClearFormOpened();
                    break;
            }
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

        private void button1_Click(object sender, EventArgs e)
        {
            //this.CloseForm();
            //this.ContratoForm = new ContratoForm(this);
            //this.formOpened = "ContratoForm";
            //this.ContratoForm.Show();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            //this.CloseForm();
            //this.FardamentoForm = new FardamentoForm(this);
            //this.formOpened = "FardamentoForm";
            //this.FardamentoForm.Show();
        }

        private void button3_Click(object sender, EventArgs e)
        {
            //this.CloseForm();
            //this.FuncaoForm = new FuncaoForm(this);
            //this.formOpened = "FuncaoForm";
            //this.FuncaoForm.Show();
        }

        public void ClearFormOpened()
        {
            this.formOpened = "";
        }
    }
}

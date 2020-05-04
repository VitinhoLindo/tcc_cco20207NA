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
    public partial class AcessoSistemaForm : Form
    {
        private MainController MainController = new MainController();

        public AcessoSistemaForm()
        {
            InitializeComponent();
        }

        /**
         * <summary>
         *      Botão de entrar no systema.
         * </summary>
         */
        private void button1_Click(object sender, EventArgs e)
        {
            dynamic logged = this.MainController.SingIn(textBox1.Text, textBox2.Text);
            if (logged.status) {
                this.Visible = !logged.status;
                this.MainController.Menu.AcessoSistemaForm = this;
                MessageBox.Show(logged.message, logged.head, MessageBoxButtons.OK, MessageBoxIcon.None);
                this.MainController.Menu.Show();
            }
            else {
                MessageBox.Show(logged.message, logged.head, MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
        }

        public void Loggout()
        {
            bool status = this.MainController.Loggout();
            this.Clear(false);
            if (status) this.Visible = status;
            else this.MainController.Loggout();
        }

        public void Clear(bool login = true, bool senha =true)
        {
            if (login) 
            this.textBox1.Text = "";
            if (senha)
            this.textBox2.Text = "";
        }
    }
}

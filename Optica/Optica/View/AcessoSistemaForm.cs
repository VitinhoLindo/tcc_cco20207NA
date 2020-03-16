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
            AcessoSistemaController controller = new AcessoSistemaController();
            controller.AcessarSistema(textBox1.Text, textBox2.Text);
        }
    }
}

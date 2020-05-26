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
    public partial class FardamentoForm : Form
    {
        private dynamic originalForm;

        public FardamentoForm(dynamic originalForm)
        {
            InitializeComponent();
        }
    }
}

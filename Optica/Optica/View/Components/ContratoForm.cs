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
    public partial class ContratoForm : Form
    {
        private dynamic originalForm;

        public ContratoForm(dynamic originalForm)
        {
            InitializeComponent();
        }
    }
}

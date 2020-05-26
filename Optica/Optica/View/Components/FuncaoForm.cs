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
    public partial class FuncaoForm : Form
    {
        private dynamic originalForm;

        public FuncaoForm(dynamic originalForm)
        {
            InitializeComponent();
        }
    }
}

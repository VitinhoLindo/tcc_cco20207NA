using System;
using System.Windows.Forms;
using Optica.Model;

namespace Optica.View
{
    public partial class PerfilForm : Form
    {
        private dynamic originalForm;
        private File file;

        public PerfilForm(dynamic originalForm)
        {
            InitializeComponent();
            this.originalForm = originalForm;
        }

        private void button1_Click(object sender, EventArgs e)
        {
            OpenFileDialog dialog = new OpenFileDialog();

            dialog.Title = "Selecione a Imagem";
            dialog.Filter = "images|*.jpeg;*.jpg;*.gif;*.png;*.svg;*.tif;*.tiff;";

            if (dialog.ShowDialog() == DialogResult.OK)
            {
                this.file = (new File()).GetFileProfile(dialog.FileName);

                this.pictureBox1.Image = this.file.GetImageProfile(this.pictureBox1.Width, this.pictureBox1.Height);
                this.textBox1.Text = this.file.Name;
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            this.file = null;

            this.pictureBox1.Image = null;
            this.textBox1.Text = "";
        }

        private void PerfilForm_FormClosed(object sender, FormClosedEventArgs e)
        {
            if (this.file != null)
            {
                if (this.textBox1.Text.Length > 4) this.file.Name = this.textBox1.Text;
                
            }
            this.originalForm.ClearFormOpened();
        }
    }
}

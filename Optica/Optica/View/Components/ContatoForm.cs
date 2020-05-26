using System;
using System.Windows.Forms;
using System.Text.RegularExpressions;
using Optica.Model;
using Optica.Controller;

namespace Optica.View
{
    public partial class ContatoForm : Form
    {
        private dynamic originalForm;
        //private Contatos Contato;
        //private ErrorProvider errorProvider = new ErrorProvider();
        //private Regex regExpEmail = new Regex(@"^([\w\d_\.]*\@\w*\.\w*)$");
        //private Regex regExpEmail2 = new Regex(@"^([\w\d_\.]*\@\w*\.\w*\.\w*)$");

        public ContatoForm(dynamic originalForm)
        {
            InitializeComponent();
            this.originalForm = originalForm;
        }

        private void ContatoForm_FormClosed(object sender, FormClosedEventArgs e)
        {
            this.originalForm.ClearFormOpened();
        }


        //private bool ValidateInput()
        //{
        //    Match matchEmail1 = this.regExpEmail.Match(this.textBox1.Text);
        //    Match matchEmail2 = this.regExpEmail2.Match(this.textBox1.Text);
        //    Match matchEmail3 = this.regExpEmail.Match(this.textBox2.Text);
        //    Match matchEmail4 = this.regExpEmail2.Match(this.textBox2.Text);

        //    this.textBox3.Text = Regex.Replace(this.textBox3.Text, @"\+", "");
        //    this.textBox4.Text = Regex.Replace(this.textBox4.Text, @"\+", "");
        //    this.textBox5.Text = Regex.Replace(this.textBox5.Text, @"\+", "");
        //    this.textBox6.Text = Regex.Replace(this.textBox6.Text, @"\+", "");

        //    Match matchPhone1 = Regex.Match(this.textBox3.Text, @"^\d*$");
        //    Match matchPhone2 = Regex.Match(this.textBox4.Text, @"^\d*$");
        //    Match matchPhone3 = Regex.Match(this.textBox5.Text, @"^\d*$");
        //    Match matchPhone4 = Regex.Match(this.textBox6.Text, @"^\d*$");

        //    if (matchEmail1.Success == false && matchEmail2.Success == false) return false;
        //    if (matchEmail3.Success == false && matchEmail4.Success == false) return false;
        //    if (matchPhone1.Success == false) return false;
        //    if (matchPhone2.Success == false) return false;
        //    if (matchPhone3.Success == false) return false;
        //    if (matchPhone4.Success == false) return false;

        //    return true;
        //}

        private void button1_Click(object sender, EventArgs e)
        {
            //if (ValidateChildren(ValidationConstraints.Enabled))
            //{

            //}
            //if (ValidateInput())
            //{

            //}
        }


        private void textBox3_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (char.IsLetter(e.KeyChar) && e.KeyChar != '+') e.Handled = true;
        }

        private void textBox4_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (char.IsLetter(e.KeyChar) && e.KeyChar != '+') e.Handled = true;
        }

        private void textBox5_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (char.IsLetter(e.KeyChar) && e.KeyChar != '+') e.Handled = true;
        }

        private void textBox6_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (char.IsLetter(e.KeyChar) && e.KeyChar != '+') e.Handled = true;
        }

        //private void textEmail_Validating(object sender, System.ComponentModel.CancelEventArgs e)
        //{
        //    Match matchEmail = Regex.Match(this.textEmail.Text, @"(^([\w\d_\.]*\@\w*\.\w{3})$)|(^([\w\d_\.]*\@\w*\.\w{3}\.\w{2})$)");
        //    if (string.IsNullOrEmpty(this.textEmail.Text) || this.textEmail.Text.Length < 5)
        //    {
        //        e.Cancel = true;
        //        this.textEmail.Focus();
        //        this.errorProvider.SetError(this.textEmail, "E-mail don't informed.");
        //    }
        //    if (matchEmail.Success == false)
        //    {
        //        e.Cancel = true;
        //        this.textEmail.Focus();
        //        this.errorProvider.SetError(this.textEmail, "E-mail fotmat don't suported.");
        //    }
        //}

        //private void textEmail2_Validating(object sender, System.ComponentModel.CancelEventArgs e)
        //{
        //    Match matchEmail = Regex.Match(this.textEmail2.Text, @"(^([\w\d_\.]*\@\w*\.\w{3})$)|(^([\w\d_\.]*\@\w*\.\w{3}\.\w{2})$)");
        //}

        //private void textPhone1_Validating(object sender, System.ComponentModel.CancelEventArgs e)
        //{

        //}

        //private void textPhone2_Validating(object sender, System.ComponentModel.CancelEventArgs e)
        //{

        //}

        //private void textPhone3_Validating(object sender, System.ComponentModel.CancelEventArgs e)
        //{

        //}

        //private void textPhone4_Validating(object sender, System.ComponentModel.CancelEventArgs e)
        //{

        //}
    }
}

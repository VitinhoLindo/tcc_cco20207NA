using System.IO;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Drawing2D;
//using System.Drawing.Imaging;

namespace Optica.Model
{
    class File
    {
        private int id;
        private string name;
        private string extension;
        private long length;
        private byte[] bin;

        public File()
        {

        }

        public File(string name, string extension, long length, byte[] bin) : this()
        {
            this.name = name;
            this.extension = extension;
            this.length = length;
            this.bin = bin;
        }

        //private byte[] GetBin(Image image)
        //{
        //    //Bitmap bitm = new Bitmap(path);
        //    MemoryStream MS = new MemoryStream();
        //    image.Save(MS, ImageFormat.Bmp);
        //    return MS.ToArray();
        //}

        //public Image GetImage(byte[] bin)
        //{
        //    MemoryStream MS = new MemoryStream(bin);
        //    //Bitmap bitm = new Bitmap(img);
        //    return Image.FromStream(MS);
        //}

        //private string OriginalExtension(Image img)//byte[] bin)
        //{
        //    //Image img = this.GetImage(bin);
        //    ImageFormat format = img.RawFormat;
        //    ImageCodecInfo[] codec = ImageCodecInfo.GetImageDecoders();
        //    string mimeType = "";

        //    for (int x = 0; x < codec.Length; x++)
        //        if (codec[x].FormatID == format.Guid)
        //        {
        //            mimeType = codec[x].MimeType;
        //            break;
        //        }

        //    string[] splited = mimeType.Split('/');

        //    return splited[1];
        //}



        private Image ResizeImage(Image image, int Width, int Height)
        {
            var destRect = new Rectangle(0, 0, Width, Height);
            var destImage = new Bitmap(Width, Height);

            using (var graphics = Graphics.FromImage(destImage))
            {
                graphics.CompositingMode = CompositingMode.SourceCopy;
                graphics.CompositingQuality = CompositingQuality.HighQuality;
                graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                graphics.SmoothingMode = SmoothingMode.HighQuality;
                graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;

                using (var wrapMode = new ImageAttributes())
                {
                    wrapMode.SetWrapMode(WrapMode.TileFlipXY);
                    graphics.DrawImage(image, destRect, 0, 0, image.Width, image.Height, GraphicsUnit.Pixel, wrapMode);
                }
            }

            MemoryStream ms1 = new MemoryStream();
            destImage.Save(ms1, ImageFormat.Bmp);
            MemoryStream ms2 = new MemoryStream(ms1.ToArray());
            return Image.FromStream(ms2);
        }


        public Image GetImageProfile(int Width = 0, int Height = 0)
        {
            MemoryStream ms = new MemoryStream(this.bin);
            Image image = Image.FromStream(ms);

            if (Width > 0 && Height > 0)
            {
                return this.ResizeImage(image, Width, Height);
            }

            return image;
        }

        public File GetFileProfile(string path)
        {
            // capturando informações do arquivo e a imagem.
            FileInfo imageInfo = new FileInfo(path);
            Image imagem = Image.FromFile(path);

            // capturando imagem e binario da imagem.
            MemoryStream ms = new MemoryStream();
            imagem.Save(ms, ImageFormat.Bmp);
            byte[] binary = ms.ToArray();

            // informações da imagem.
            string name = imageInfo.Name;
            ImageFormat format = imagem.RawFormat;
            ImageCodecInfo[] codec = ImageCodecInfo.GetImageDecoders();
            string mimeType = "";

            for (int x= 0; x < codec.Length; x++)
               if (codec[x].FormatID == format.Guid)
                {
                    mimeType = codec[x].MimeType.Split('/')[1];
                    break;
                }

            return new File(name, mimeType, imageInfo.Length, binary);
        }

        public int Id
        {
            get { return this.id; }
            set { this.id = value; }
        }

        public string Name
        {
            get { return this.name; }
            set { this.name = value; }
        }

        public string Extension
        {
            get { return this.extension; }
            set { this.extension = value; }
        }

        public long Length
        {
            get { return this.length; }
            set { this.length = value; }
        }

        public byte[] Bin
        {
            get { return this.bin; }
            set { this.bin = value; }
        }
    }
}

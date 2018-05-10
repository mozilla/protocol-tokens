extension UIColor {
  
    func gradient-greyscale() {
      let layer : CAGradientLayer = CAGradientLayer()
      layer.frame.size = self.frame.size
      layer.frame.origin = CGPointZero
      layer.cornerRadius = CGFloat(frame.width / 20)

      
      let color0x000000 = UIColor(0x000000)
      let color0xFFFFFF = UIColor(0xFFFFFF)

      layer.colors = [color0x000000, color0xFFFFFF]
        

      self.layer.insertSublayer(layer, atIndex: 0)
    }
    func gradient-focus() {
      let layer : CAGradientLayer = CAGradientLayer()
      layer.frame.size = self.frame.size
      layer.frame.origin = CGPointZero
      layer.cornerRadius = CGFloat(frame.width / 20)

      
      let color0x4A1475 = UIColor(0x4A1475)
      let color0x671878 = UIColor(0x671878)
      let color0xC42482 = UIColor(0xC42482)
      let color0xFF271D = UIColor(0xFF271D)

      layer.colors = [color0x4A1475, color0x671878, color0xC42482, color0xFF271D]
        

      self.layer.insertSublayer(layer, atIndex: 0)
    }
    func gradient-helloworld() {
      let layer : CAGradientLayer = CAGradientLayer()
      layer.frame.size = self.frame.size
      layer.frame.origin = CGPointZero
      layer.cornerRadius = CGFloat(frame.width / 20)

      
      let color0x4A1475 = UIColor(0x4A1475)
      let color0x671878 = UIColor(0x671878)
      let color0xC42482 = UIColor(0xC42482)

      layer.colors = [color0x4A1475, color0x671878, color0xC42482]
        

      self.layer.insertSublayer(layer, atIndex: 0)
    }
}
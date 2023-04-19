import { Layout, Row, Col } from "antd";
import { HeartFilled } from "@ant-design/icons";
import { textVersion } from "src/utils/text";

function Footer() {
  const { Footer: AntFooter } = Layout;

  return (
    <AntFooter>
      <Row style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div
          className="copyright"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          ©Nhất Tin Group 2022. All rights reserved
        </div>
        {/* <Col xs={24} md={12} lg={12}>
          <div className="footer-menu">
            <ul>
              <li className="nav-item">
                <a
                  href="#pablo"
                  className="nav-link text-muted"
                  target="_blank"
                >
                    NHẤT TÍN  
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#pablo"
                  className="nav-link text-muted"
                  target="_blank"
                >
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#pablo"
                  className="nav-link text-muted"
                  target="_blank"
                >
                  Blog
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#pablo"
                  className="nav-link pe-0 text-muted"
                  target="_blank"
                >
                  License
                </a>
              </li>
            </ul>
          </div>
        </Col> */}
      </Row>
    </AntFooter>
  );
}

export default Footer;

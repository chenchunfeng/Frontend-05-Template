### HTTP协议解析

网络七层模型ISO-OSI七层网络模型
- 物理层 
- 数据链路层  wifi/4g  接入层
- 网络层     internet
- 传输层     TCP
- 会话层
- 表示层
- 应用层    剩下这三个就http解析了

![avatar](./1.png)

TCP IP 里面的一些概念

- 流(stream)  没有明显的分割单位，只保证前后顺序
- 端口  每个软件应用的标识吧，网卡根据端口号分析数据
- 包(packet)   传输数据包 TCP/IP传输的数据单元
  - 应用层在发送数据的时候，都是站在一个个包的视角，将包一个个发送出去，形成一个 stream，接收端收到 stream 之后，再按照具体的协议切割还原成发送方所发送的包
- IP  连接internet的设备
- require('net')
- libnet（构造IP包并发送）/libcap（去网卡抓流经网卡的IP包）

request response 一一对应的

- 文本协议 都是字符串内容

![avatar](./2.png)

1. 第一行request line 三部分 method 、path/、http 及其版本
2. headers  冒号分割的 键值对
3. body 格式同content-type 决定

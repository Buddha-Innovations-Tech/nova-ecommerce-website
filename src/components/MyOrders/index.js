import moment from 'moment/moment';
import React, { useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscriberOrdersAsync } from '../../redux/subscriberSlice';

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.subscribers);
  const { currencyValue, currencyCode } = useSelector(
    (state) => state.products
  );
  console.log(orders);

  const variantInfo = (variant) => {
    const variantKeys = Object.keys(variant);

    if (variantKeys.length === 1) {
      return (
        <div>
          <small>{variantKeys[0]}</small>
          <small>: </small>
          <small>{[variant[variantKeys[0]]]}</small>
        </div>
      );
    }
    return (
      <div>
        <div>
          <small>{variantKeys[0]}</small>
          <small>: </small>
          <small>{[variant[variantKeys[0]]]}</small>
        </div>
        <div>
          <small>{variantKeys[1]}</small>
          <small>: </small>
          <small>{[variant[variantKeys[1]]]}</small>
        </div>
      </div>
    );
  };

  useEffect(() => {
    dispatch(getSubscriberOrdersAsync());
  }, []);
  return (
    <div>
      <Container>
        <section>
          <h2>My Orders</h2>
        </section>

        {orders &&
          orders.map((order) => (
            <section className='orderWrapper'>
              <section
                key={order._id}
                className='flex-between flex-wrap gap-3  p-2'
              >
                <small>
                  <strong>Order Id: </strong> {order._id}
                </small>
                <small>
                  <strong>Merchant Ref: </strong> {order.merchantReference}
                </small>
                <small>{moment(order.createdAt).format('lll')}</small>
                <small>
                  <strong>Status : </strong>{' '}
                  {order.deliveryStatus.replaceAll('_', ' ')}{' '}
                </small>
              </section>
              <Table>
                <thead className='myOrderTable'>
                  <tr>
                    <th>
                      <small>S.N</small>
                    </th>
                    <th>
                      <small>Product</small>
                    </th>
                    <th>
                      <small>Qnt</small>
                    </th>
                    <th>
                      <small>Price</small>
                    </th>
                    <th>
                      {' '}
                      <small>Sub-Total</small>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems.map((item, index) => (
                    <tr key={item._id}>
                      <td className='myOrderTable'>{index + 1}</td>
                      <td>
                        <div className='imageHolder'>
                          <figure>
                            <img
                              src={`${process.env.REACT_APP_IMAGE_PREFIX}${item.productImage}`}
                              alt=''
                            />
                          </figure>
                          <div className='d-flex flex-column'>
                            <div className='imageHolder-text'>
                              {item.productName}
                            </div>
                            <div className='itemInfo-info-brand '>
                              {item.variant ? variantInfo(item.variant) : null}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{item.quantity}</td>
                      <td className='myOrderTable'>
                        {currencyCode}{' '}
                        {item.productPrice * Number(currencyValue) -
                          Math.floor(
                            item.productPrice * Number(currencyValue)
                          ) !==
                        0
                          ? (item.productPrice * Number(currencyValue)).toFixed(
                              2
                            )
                          : item.productPrice * Number(currencyValue)}
                      </td>
                      <td>
                        {currencyCode}{' '}
                        {item.quantity *
                          item.productPrice *
                          Number(currencyValue) -
                          Math.floor(
                            item.quantity *
                              item.productPrice *
                              Number(currencyValue)
                          ) !==
                        0
                          ? (
                              item.quantity *
                              item.productPrice *
                              Number(currencyValue)
                            ).toFixed(2)
                          : item.quantity *
                            item.productPrice *
                            Number(currencyValue)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div className='text-end me-3'>
                <span>
                  <strong>
                    Total: {currencyCode}{' '}
                    {order.grandTotal * Number(currencyValue) -
                      Math.floor(order.grandTotal * Number(currencyValue)) !==
                    0
                      ? (order.grandTotal * Number(currencyValue)).toFixed(2)
                      : order.grandTotal * Number(currencyValue)}
                  </strong>
                </span>
              </div>
            </section>
          ))}
      </Container>
    </div>
  );
};

export default MyOrders;

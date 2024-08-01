import { Card, CardHeader, CardBody, CardFooter } from '../../ui';
import { Colors } from '../../utils/enums';

const DatasetRoot = () => {
    return (
        <Card>
            <CardHeader
          className="flex items-center justify-center rounded-t-lg text-bg-light"
          color={Colors.primary} title={''}            />
            <CardBody>
                <div>
                    <div>
                        {/* Contenido del cuerpo de la tarjeta aquí */}
                    </div>
                </div>
            </CardBody>
            <CardFooter className="flex justify-center border-t-2 border-indigo-100 shadow-inner bg-light">
                {/* Contenido del pie de la tarjeta aquí */}
            </CardFooter>
        </Card>
    );
};

export default DatasetRoot;

# recruitment



https://github.com/knetikmedia/recruitment-test



{clickedItem &&
          <>
            <DeviceDetail
              devices={devices}
              item={clickedItem}
              visibleDetail={visibleDetail}
              setVisibleDetail={setVisibleDetail}
            />
            <DeviceEdit
              item={clickedItem}
              setVisibleEdit={setVisibleEdit}
              visibleEdit={visibleEdit}
              setVisibleDetail={setVisibleDetail}
            />
          </>
        }